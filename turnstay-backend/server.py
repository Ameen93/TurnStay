# turnstay-backend/server.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from payment_app import create_payment_intent

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


@app.route("/api/create-payment-intent", methods=["POST"])
def handle_payment_intent():
    payment_details = request.json
    result = create_payment_intent(payment_details)
    if result:
        return jsonify(result), 200
    else:
        return jsonify({"error": "Payment initialization failed"}), 500


if __name__ == "__main__":
    app.run(debug=True)
