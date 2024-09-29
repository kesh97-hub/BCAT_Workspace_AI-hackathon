import os
import io
import textwrap
import warnings
from flask import Flask,jsonify,request
from PyPDF2 import PdfReader
from pathlib import Path
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import FlashrankRerank
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Qdrant
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.document_loaders import TextLoader, PyPDFLoader
from llama_parse import LlamaParse
import asyncio
import re
from dotenv import load_dotenv
from datetime import datetime
import argparse

app=Flask(__name__)
warnings.filterwarnings("ignore")
load_dotenv()
os.environ['GROQ_API_KEY']=os.getenv("GROQ_API_KEY")
os.environ['LLAMA_API_KEY']=os.getenv("LLAMA_API_KEY")


def print_response(response):
    res=response['result']
    for text in res.split('\n'):
        if not text:
            print()
        print("\n".join(textwrap.wrap(text,100,break_long_words=False)))


def answer_question(qa,query):
    response=qa.invoke(query)
    return response['result']


@app.route("/fetch",methods=['POST'])
async def fetch_result():
#     parser=LlamaParse(
#     api_key=os.environ['LLAMA_API_KEY'],
#     result_type="markdown",
#     max_timeout=5000,
# ) 

    if 'file' not in request.files:
        return jsonify({"error":"No file found!"}),400
    pdf_file=request.files['file']
    
    if not pdf_file.endswith(".pdf"):
        return jsonify({"error":"File format not supported"}),400
    pdf_buffer=io.BytesIO(pdf_file.read())

    reader=PdfReader(pdf_buffer)    
    # parsed_document=await parser.aload_data(doc)
    text_loader = TextLoader()
    parsed_document = text_loader.load()

    parsed_doc=parsed_document[0]
    now=datetime.now()
    parsed_doc.page_content+= f"Current date is {now.strftime('%Y-%m-%d')}, Current day is {now.strftime('%A')}"
    print(parsed_doc.page_content)

    doc_path=Path('data/parsed_doc.md')
    doc_path.parent.mkdir(parents=True, exist_ok=True)
    with doc_path.open("w") as f:
        f.write(parsed_doc.page_content)
    
    loader=UnstructuredMarkdownLoader(doc_path)
    loaded_doc=loader.load()
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=100)
    docs=text_splitter.split_documents(loaded_doc)

    embeddings=FastEmbedEmbeddings(model_name="BAAI/bge-base-en-v1.5")
    qdrant=Qdrant.from_documents(
    docs,
    embeddings,
    path='./db',
    collection_name="document_embeddings"
)
    retriver=qdrant.as_retriever(search_kwargs={"k":1})

    llama=ChatGroq(temperature=0,model_name="llama3-70b-8192")

    prompt_template='''Using the details extract the Summary of the event, team participating, date of the event, venue (Where the event is going to take place at) 
                    also give a title, everything in json format, Get all values accurately. If any of the details not mentioned keep it null. If specific date is not given calculate date from the present date Eg: If today is 2024-09-05 and day is Thursday then next Wednesday means 2024-09-11(add 6 days).
                    Present date is given as yy-mm-dd.
                    Dont give any other response
                    context:{context}'''
    prompt=PromptTemplate(
    template=prompt_template,input_variables=['context']
)
    qa=RetrievalQA.from_chain_type(
    llm=llama,
    chain_type="stuff",
    retriever=retriver,
    return_source_documents=True,
    chain_type_kwargs={'prompt':prompt}
)
    
    ans=answer_question(qa,"")
    match = re.search(r'({.*?})', ans, re.DOTALL)
    if match:
        json_part = match.group(1)

    return jsonify(json_part),200


if __name__=="__main__":
    app.run(debug=True)

    # parser = argparse.ArgumentParser(description="PDF file path")
    # parser.add_argument('path', type=str)
    # doc=parser.parse_args().path

    # print(asyncio.run(fetch_result(doc)))