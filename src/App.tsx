import React, { useState } from "react";
import { BACKEND_API_URL } from "./lib/constants";
import "./App.css";
import SearchBar from "./components/searchBar.component";
import Layout from "./components/layout.component";
import Table from "./components/table.component";
import useShortUrlsApi from "./lib/hooks";
import Store from "./lib/store";

function App() {
  const [{ data, isError, isLoading }, { setUrl, setData, setIsError }] =
    useShortUrlsApi(BACKEND_API_URL);
  const [isTyping, setIsTyping] = useState(false);
  const [store] = useState(new Store());

  // Only add to store if data valid
  console.log("data", data);
  if (data.shortUrl) {
    store.addUrl(data.originalUrl, data.shortUrl);
    // reset data state properties. Causes bug if not reset when
    // a user clicks on the shorten url button.
    setData({ originalUrl: "", shortUrl: null });
  }
  console.log("error", isError);

  return (
    <Layout
      header={
        <SearchBar
          setUrl={setUrl}
          setIsTyping={setIsTyping}
          isTyping={isTyping}
          isError={isError}
          setIsError={setIsError}
        />
      }
      main={
        <Table
          store={store}
          isLoading={isLoading}
          setIsTyping={setIsTyping}
          isTyping={isTyping}
        />
      }
    />
  );
}

export default App;
