import { AppProps } from "../lib/props.types";

const Layout: React.FunctionComponent<AppProps> = ({ header, main }) => {
  return (
    <section className="h-screen grid">
      <header className="row-span-4 flex justify-center items-center grid grid-cols-12">
        {header}
      </header>
      <span className="grid grid-cols-12 mb-2">
        <hr className="col-start-2 col-end-12" />
      </span>
      <main className="row-span-20  flex justify-center grid grid-cols-12">
        {main}
      </main>
    </section>
  );
};

export default Layout;
