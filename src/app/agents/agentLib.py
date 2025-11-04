import requests

def get_budgets():
    """
    Returns a list of all budgets the input user_id is a member of

    Output:
        If http request successful:
            {"message":<DESCRIPTION OF RESULT>,"status":<RESULT STATUS>,"budgets":<LIST OF ASSOCIATED BUDGETS>}
        If http request failed:
            {"message":<FAILURE MESSAGE>,"status":<RESULT STATUS>}
    """
    try:
        response = requests.get(f"http://localhost:3000/api/budgetMembership?user_id=35")
        response.raise_for_status()
        data = response.json()

        user = data.get("user")
        budgets = user.get("budgets",[])

        if not budgets:
            return {"message":"No budgets associated with given user_id","status":"success","budget_names":[]}
        
        budget_names = [b["name"] for b in budgets if "name" in b]

        return {"message":"Budgets succesfully found","status": "success","budget_names":budget_names}
    except Exception as e:
        print("get_budgets() error:", e)
        return{"message":"Request failed","status":"error"}
    
def get_transactions():
    """
    Returns a list of all transactions from an input category_id
    """
# TODO: create frontend endpoint which gives all transactions for a given budget
# as well as add component with this on each budget page