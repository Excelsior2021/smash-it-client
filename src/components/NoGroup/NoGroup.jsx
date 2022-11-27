import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../store/main-context";
import Button from "../Button/Button";
import "./NoGroup.scss";

const NoGroup = () => {
  const mainCtx = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <>
      {mainCtx.user && (
        <div className="no-group">
          <h1>
            hey {mainCtx.user.firstName}, you are not a part of any group,
            please join or create one!
          </h1>
          <Button
            type="join-create"
            click={() => navigate(`/${mainCtx.user.username}/join-create`)}
          >
            join or create group
          </Button>
        </div>
      )}
    </>
  );
};

export default NoGroup;
