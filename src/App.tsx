import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Joi from "joi";

function App() {
  const [url, setURL] = useState("");
  const [query, setQuery] = useState("");
  const [hasError, setError] = useState(null);

  const handleShortening = () => {
    const [{ error, value }] = validateUrl(url);
    if (error) {
      setError(true);
    }

    setQuery(value);
  };

  return (
    <>
      {hasError ?? (
        <div>There was a problem shortening your URL. Please try again.</div>
      )}
      <input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
      <button onClick={() => handleShortening()}>Shorten</button>
      <p>{query}</p>
    </>
  );
}

export default App;

function useShortenUrlAPI() {}

function validateUrl(url: string) {
  const schema = Joi.string().domain({
    tlds: { allow: ["com", "dev", "co", "org"] },
  });
  const { value, error } = schema.validate(url);
  return [{ value, error }];
}
