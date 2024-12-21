import React, { useState } from "react";
import Login from "./components/Login.jsx";
import Chatbot from "./components/Chatbot.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div>
          <button
            onClick={() => {
              setToken(null);
              localStorage.removeItem("token");
            }}
          >
            Logout
          </button>
          <Chatbot />
        </div>
      )}
    </div>
  );
}

export default App;
