import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "./lib/constants";
import { validateUrl } from "./lib/validateUrl";
import "./App.css";
import SearchBar from "./components/searchBar.component";
import Layout from "./components/layout.component";
import Table from "./components/table.component";
// import CryptoJS from "crypto-js";
import crypto from "crypto";

function App() {
  const [url, setUrl] = useState("");
  const [hasError, setError] = useState(false);
  console.log(crypto.randomBytes(5));

  const handleShortening = async () => {
    setError(false);

    const { error } = await validateUrl(url);
    if (error) {
      return setError(true);
    }

    // url valid at this point
    await fetch(BACKEND_API_URL, {
      method: "POST",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then(async (response) => {
        let result = await response.json();
        console.log("result", result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Layout header={<SearchBar url={url} setUrl={setUrl} />} main={<Table />} />
  );
}

export default App;

{
  /* {hasError && (
    <div>There was a problem shortening your URL. Please try again.</div>
  )}
  <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
  <button onClick={() => handleShortening()}>Shorten</button>
  <p>{url}</p> */
}
