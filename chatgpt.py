import os
import sys

# import constants
import openai
import langchain
from langchain.llms import OpenAI
from langchain.document_loaders import DirectoryLoader
from langchain.document_loaders import PyPDFLoader

from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI

openAiapiKey = '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',


os.environ["OPENAI_API_KEY"]= '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'
openAiBaseURL = 'https://api.openai.com/v1/engines/text-davinci-003/completions'


query = sys.argv[1]
loader = PyPDFLoader("C:/Users/Wilson Mutua/OneDrive - healthstrat.co.ke/Projects/Doki-App/Doki/docs/doc.pdf")
print(loader)
# print(loader)
index = VectorstoreIndexCreator().from_loaders([loader])

print(index.query(query, llm=ChatOpenAI(api_key='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')))
    # openAiapiKey, openAiBaseURL
# print("this is it: " +  (index.query(query, llm=ChatOpenAI(api_key='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'))).lower())