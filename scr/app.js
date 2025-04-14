import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [subject, setSubject] = useState("General");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://your-vercel-api-url.vercel.app/ask/", {
        question,
        subject,
      });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Error fetching response.");
    }
  };

  return (
    <div className="App">
      <h1>AI Study Assistant</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here..."
        />
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="General">General</option>
          <option value="DBMS">Database Management Systems</option>
          <option value="DSA">Data Structures & Algorithms</option>
          <option value="Digital Electronics">Digital Electronics</option>
          <option value="Python">Python Programming</option>
          <option value="Mathematics">Mathematics III</option>
          <option value="Economics">Economics for Engineers</option>
          <option value="Discrete Mathematics">Discrete Mathematics</option>
          <option value="COA">Computer Organization & Architecture</option>
          <option value="OS">Operating Systems</option>
          <option value="OOP">Object-Oriented Programming</option>
          <option value="Web Technologies">Web Technologies</option>
        </select>
        <button type="submit">Ask</button>
      </form>
      {response && <div className="response"><strong>Answer:</strong> {response}</div>}
    </div>
  );
}

export default App;
