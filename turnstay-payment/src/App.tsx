import React from "react";
import PaymentForm from "./components/PaymentForm";
import "./App.css"; // Optional: Add a CSS file for styling

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TurnStay Payment</h1>
      </header>
      <main>
        <PaymentForm />
      </main>
    </div>
  );
};

export default App;
