import { AppProps } from "../lib/props.types";

const Layout: React.FunctionComponent<AppProps> = ({ header, main }) => {
  return (
    <section className="h-screen grid">
      <header className="row-span-4 flex justify-center items-center">
        {header}
      </header>
      <main className="row-span-20  flex justify-center">{main}</main>
    </section>
  );
};

export default Layout;
