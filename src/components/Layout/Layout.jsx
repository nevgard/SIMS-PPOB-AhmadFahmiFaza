import Header from "./Header";
import Summary from "./Summary";
const Layout = ({ children, summary, header }) => {
  return (
    <div className="w-full h-screen bg-white">
      {header && <Header />}
      <main className="px-32">
        {summary && <Summary />}
        {children}
      </main>
    </div>
  );
};

export default Layout;
