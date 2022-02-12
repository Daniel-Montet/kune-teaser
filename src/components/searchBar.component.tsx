import { AppProps } from "../lib/props.types";
import { useState } from "react";

const SearchBar: React.FunctionComponent<AppProps> = ({
  setUrl,
  setIsTyping,
  isError,
  setIsError,
}) => {
  const [query, setQuery] = useState("");
  const [isEmpty, setIsEmpty] = useState(query.length < 1);
  console.log(isError);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query) {
      setIsError(true);
      return setIsEmpty(true);
    }
    setIsEmpty(false);
    setIsTyping(false);
    setIsError(false);

    // trigger fetch to API endpoint 'shorten_url'
    return setUrl(query);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(false);
    setIsTyping(true);
    setIsError(false);
    setQuery(event.target.value);
  };

  return (
    <div className="col-start-2 col-end-12 flex flex-col gap-y-4 text-center justify-center items-center w-full">
      <span className="text-gray-600 font-bold text-lg w-full">
        Simplify your URL
      </span>
      <form className="flex w-full" onSubmit={(e) => handleSubmit(e)}>
        <input
          className={`${
            isError
              ? "border-red-400 outline-red-500 hover:border-red-500"
              : "border-gray-300 outline-sky-500 hover:border-sky-500"
          } max-w-3/4 min-w-3/4 border-2  border-r-0  rounded-l	 text-sm	p-3`}
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder={
            isEmpty
              ? "Enter your original URL eg. http://demos.nellwinnie.net/partner/org"
              : undefined
          }
        />
        <button className="max-w-1/4 min-w-1/4 text-white text-sm font-bold p-3 bg-sky-600 rounded-r">
          Shorten Url
        </button>
      </form>
      <span className="text-sm text-red-500 animate-pulse">
        {isError && "Invalid Url!"}
      </span>
    </div>
  );
};

export default SearchBar;
