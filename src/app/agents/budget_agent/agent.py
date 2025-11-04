from google.adk import Agent
from agentLib import get_budgets

root_agent = Agent(
    model='gemini-2.5-flash',
    name='root_agent',
    description='A helpful assistant for user questions.',
    instruction="""Answer user questions related to their budgets and transactions within this app
                    You have access to the tool: get_budgets,
                    This tool returns a list of budgets for the user we care about
                """,
    tools=[get_budgets]
)
