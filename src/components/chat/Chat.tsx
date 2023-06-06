import React, { useState } from "react";

function ChatBot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  //   async function askQuestion() {
  //     try {
  //       const response = await fetch("https://api.chatgpt.com/your-endpoint", {
  //         method: "POST",
  //         headers: {

  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ question }),
  //       });

  //       const data = await response.json();
  //       setAnswer(data.answer);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  async function askQuestion() {
    try {
      const response = await fetch("/api/your-endpoint", {
        method: "POST",
        headers: {
          mode: "no-cors",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function handleChange(e: any) {
    setQuestion(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    askQuestion();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={question} onChange={handleChange} />
        <button type="submit">Ask</button>
      </form>
      {answer && <div>{answer}</div>}
    </div>
  );
}

export default ChatBot;
