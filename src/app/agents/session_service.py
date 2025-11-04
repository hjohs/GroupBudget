from dotenv import load_dotenv
from google.adk.runners import Runner
from google.genai import types
from budget_agent import budget_agent


load_dotenv()

APP_NAME = "budget_chatbot"

runner = Runner(agent=budget_agent, app_name=APP_NAME)


