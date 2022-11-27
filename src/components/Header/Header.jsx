import { useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import menu from "../../assets/icons/menu.svg";
import "./Header.scss";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const windowSize = useWindowSize();

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <div className="header__nav">
          <img
            src={menu}
            alt="menu"
            className="header__menu"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && windowSize.width < 768 && (
            <Nav setShowMenu={setShowMenu} />
          )}
          {windowSize.width >= 768 && <Nav setShowMenu={setShowMenu} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
