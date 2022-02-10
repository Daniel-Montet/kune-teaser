import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "./lib/constants";
import { validateUrl } from "./lib/validateUrl";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [url, setURL] = useState("");
  const [hasError, setError] = useState(false);

  const handleShortening = async () => {
    setError(false);

    const { error, value } = await validateUrl(query);
    if (error) {
      setURL("");
      return setError(true);
    }
    // setURL(value);
    await fetch(BACKEND_API_URL, {
      method: "GET",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(async (response) => {
        let result = await response.json();
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {hasError && (
        <div>There was a problem shortening your URL. Please try again.</div>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleShortening()}>Shorten</button>
      <p>{url}</p>
    </>
  );
}

export default App;

function useShortenUrlAPI() {}
