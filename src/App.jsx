import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jsonPayload, setJsonPayload] = useState("");
  const [defaultPayloads, setDefaultPayloads] = useState({});
  const [error, setError] = useState("");
  const [selectedPayload, setSelectedPayload] = useState(""); // Track selected payload
  const [responseData, setResponseData] = useState({}); // Store the response data

  // Fetch default payloads and initialize access token
  useEffect(() => {
    async function initializeApp() {
      try {
        // Fetch default payloads
        let response = await import("./defaultPayloads.json");
        response = response.default || response;
        setDefaultPayloads(response);
      } catch (err) {
        console.error("Error initializing app:", err);
      }
    }
    initializeApp();
  }, []);

  const handlePayloadChange = (e) => {
    const selectedKey = e.target.value; // Get the selected payload key
    setSelectedPayload(selectedKey);
    setJsonPayload(JSON.stringify(defaultPayloads[selectedKey], null, 2)); // Update editor with selected payload
    setError(""); // Clear any errors
  };

  const handleEditorChange = (e) => {
    const value = e.target.value;
    setJsonPayload(value);

    try {
      JSON.parse(value);
      setError("");
    } catch {
      setError("Invalid JSON format");
    }
  };

  const handleSubmit = async () => {
    try {
      const parsedPayload = JSON.parse(jsonPayload);
      const route = "<FHIRPostResources Function URL Here>";

      const response = await axios.post(
        `${route}?route=${selectedPayload}`,
        parsedPayload
      );
      setResponseData(response.data); // Axios parses JSON automatically
    } catch (err) {
      console.error("Failed to submit payload:", err);
      setResponseData({ error: "Failed to submit request" }); // Handle error
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>FHIR Resource manager</h1>

      {/* Dropdown to select default payloads */}
      <label htmlFor="payload-select">Select Default Payload: </label>
      <select
        id="payload-select"
        value={selectedPayload} // Set the currently selected key
        onChange={handlePayloadChange}
      >
        {Object.keys(defaultPayloads).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {/* Textarea for JSON editing */}
      <textarea
        value={jsonPayload}
        onChange={handleEditorChange}
        rows={22}
        style={{ width: "100%", fontFamily: "monospace", marginTop: "10px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Submit Button */}
      <button onClick={handleSubmit}>Submit JSON</button>

      {/* Section to display the response */}
      <div style={{ marginTop: "20px" }}>
        <h3>Response:</h3>
        <pre
          style={{
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "5px",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {responseData
            ? JSON.stringify(responseData, null, 2)
            : "No response yet."}
        </pre>
      </div>
    </div>
  );
}

export default App;
