import React, { useEffect, useState } from "react";
import { BACKEND_API_URL } from "./lib/constants";
import "./App.css";
import SearchBar from "./components/searchBar.component";
import Layout from "./components/layout.component";
import Table from "./components/table.component";
import useShortUrlsApi from "./lib/hooks";
import Store from "./lib/store";

function App() {
  const [{ data, isError, isLoading }, setUrl] =
    useShortUrlsApi(BACKEND_API_URL);
  const [store] = useState(new Store());

  // Only add to store if data valid
  console.log("data", data);
  if (data.shortUrl) {
    store.addUrl(data.originalUrl, data.shortUrl);
  }
  console.log("error", isError);

  return (
    <Layout
      header={<SearchBar setUrl={setUrl} />}
      main={<Table store={store} isLoading={isLoading} isError={isError} />}
    />
  );
}

export default App;
