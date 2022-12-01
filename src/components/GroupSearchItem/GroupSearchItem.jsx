import { useState, useContext } from "react";
import MainContext from "../../store/main-context";
import Button from "../Button/Button";
import "./GroupSearchItem.scss";

const GroupSearchItem = ({ groupName }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const mainCtx = useContext(MainContext);

  const handleClick = async () => {
    setButtonClicked(true);
    mainCtx.updateCurrentGroup(mainCtx.user.username, groupName);
  };

  return (
    <li className="group-search-item">
      <h2 className="group-search-item__heading">{groupName}</h2>
      <div className="group-search-item__actions">
        <Button
          type={
            buttonClicked ? "group-search-item--clicked" : "group-search-item"
          }
          disabled={buttonClicked ? true : false}
          click={handleClick}
        >
          {buttonClicked ? "requested" : "join"}
        </Button>
      </div>
    </li>
  );
};

export default GroupSearchItem;
