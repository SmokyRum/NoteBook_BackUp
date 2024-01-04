import requests
import pandas as pd
from requests.auth import HTTPBasicAuth

# SharePoint site URL
site_url = "https://your-sharepoint-site-url"

# SharePoint file path
file_path = "/sites/your-site/Shared Documents/your-file.csv"

# SharePoint credentials (username and password)
username = "your-username"
password = "your-password"

# SharePoint REST API endpoint
api_endpoint = f"{site_url}/_api/web/GetFileByServerRelativeUrl('{file_path}')/$value"

# Send GET request to fetch the file content
response = requests.get(api_endpoint, auth=HTTPBasicAuth(username, password))

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Convert CSV content to a pandas DataFrame
    csv_content = response.content.decode('utf-8')
    df = pd.read_csv(pd.compat.StringIO(csv_content))
    
    # Now 'df' contains the CSV data as a DataFrame
    print(df.head())  # Print the first few rows as an example
else:
    print(f"Error: {response.status_code} - {response.text}")
