import "./Main.scss"
import Demo from "../Demo/Demo"

const Main = ({ children }) => {
  return (
    <main className="main">
      <Demo />
      <div className="main__container">{children}</div>
    </main>
  )
}

export default Main
