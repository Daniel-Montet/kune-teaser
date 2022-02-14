import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    if (data.originalUrl) {
      store.addUrl(data.originalUrl, data.shortUrl);
      setData({ originalUrl: "", shorturl: "" });
    }
  }, [data.originalUrl]);

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
