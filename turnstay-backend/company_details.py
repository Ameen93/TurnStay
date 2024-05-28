import requests
import json

with open("turnstay-backend\config.json") as config_file:
    config = json.load(config_file)


def get_company_details():
    url = f"{config['base_url']}/company"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {config['api_key']}",
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        company_details = response.json()
        return company_details
    except requests.exceptions.RequestException as e:
        print(f"Failed to get company details: {e}")
        return None


if __name__ == "__main__":
    details = get_company_details()
    if details:
        print("Company Details:")
        for key, value in details.items():
            print(f"{key}: {value}")
