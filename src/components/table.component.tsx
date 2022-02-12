import { useEffect, useState } from "react";
import { AppProps } from "../lib/props.types";

const Table: React.FunctionComponent<AppProps> = ({
  store,
  isTyping,
  setIsTyping,
}) => {
  let result = store.findAllUrls();
  let body;
  if (!result) {
    body = (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          No shortened urls at the moment
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
      </tr>
    );
  } else {
    body = result.map!((item, index) => (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
          {item.originalUrl}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {item.shortUrl}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <DoCopy
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            shortUrl={item.shortUrl}
          />
        </td>
      </tr>
    ));
  }

  return (
    <section className="w-full col-start-2 col-end-12 ">
      <div className="flex flex-col w-full">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Original Url
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                    >
                      Short Url
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    ></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {body}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DoCopy: React.FunctionComponent<AppProps> = ({
  isTyping,
  setIsTyping,
  shortUrl,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    setIsCopied(true);
    setIsTyping(false);
    // copy shortUrl to keyboard
    navigator.clipboard.writeText(shortUrl);
  };

  useEffect(() => {
    if (isTyping) {
      setIsCopied(false);
    }
  }, [isTyping]);

  return (
    <div onClick={() => handleCopy()}>
      {isCopied ? (
        <span className="text-sm text-sky-500 animate-pulse">Copied</span>
      ) : (
        <span className="text-sm">Copy</span>
      )}
    </div>
  );
};

export default Table;
