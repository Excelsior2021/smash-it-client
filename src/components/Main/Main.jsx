import "./Main.scss";

const Main = ({ children }) => {
  return (
    <main className="main">
      <div className="main__container">{children}</div>
    </main>
  );
};

export default Main;
