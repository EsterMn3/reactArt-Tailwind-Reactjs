import { useState } from "react";

import Button from "./Button.jsx";
import Input from "./Input.jsx";

export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);

    // Check if the inputs are valid
    if (enteredEmail.includes("@") && enteredPassword.trim().length >= 6) {
      // Show success message and clear fields
      setSuccessMessage("Login successful!");
      setEnteredEmail("");
      setEnteredPassword("");

      // Reset the submitted state to hide validation messages
      setSubmitted(false);
    } else {
      // Clear the success message if the input is invalid
      setSuccessMessage("");
    }
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div
      id="auth-inputs"
      className="w-full max-w-sm p-8 mx-auto rounded shadow-md bg-gradient-to-b from-stone-700 to-stone-800"
    >
      <div className="flex flex-col gap-2 mb-6">
        <Input
          label="Email"
          invalid={emailNotValid}
          type="email"
          value={enteredEmail} // Bind the value to the state
          onChange={(event) => handleInputChange("email", event.target.value)}
        />
        <Input
          invalid={passwordNotValid}
          label="Password"
          type="password"
          value={enteredPassword} // Bind the value to the state
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
        />
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" className="text-amber-400 hover:text-amber-500">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
      {/* Display success message */}
      {successMessage && (
        <p className="mt-4 p-2 text-center text-green-800 bg-green-100 border border-green-300 rounded">
          {successMessage}
        </p>
      )}
    </div>
  );
}
