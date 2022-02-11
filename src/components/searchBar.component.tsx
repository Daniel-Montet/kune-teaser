import { AppProps } from "../lib/props.types";

const SearchBar: React.FunctionComponent<AppProps> = ({ url, setUrl }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // fetch from API
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <div className="flex flex-col gap-y-4 text-center justify-center items-center w-full">
      <span className="text-white text-lg w-full">Simplify your URL</span>
      <form
        className="flex max-w-3/4 min-w-3/4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="max-w-3/4 min-w-3/4"
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <button className="max-w-1/4 min-w-1/4 text-white bg-red-600">
          Shorten Url
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
