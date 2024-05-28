import payment_app
import company_details


def main():
    print("Welcome to the Payment Application")
    print("1. Get Company Details")
    print("2. Make a Payment")
    choice = input("Please choose an option (1 or 2): ")

    if choice == "1":
        details = company_details.get_company_details()
        if details:
            print("Company Details:")
            for key, value in details.items():
                print(f"{key}: {value}")
        else:
            print("Failed to fetch company details.")
    elif choice == "2":
        payment_details = payment_app.get_dummy_payment_details()
        payment_app.make_payment(payment_details)
    else:
        print(
            "Invalid choice. Please restart the application and choose a valid option."
        )


if __name__ == "__main__":
    main()
