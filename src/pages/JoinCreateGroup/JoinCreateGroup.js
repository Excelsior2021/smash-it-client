import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../store/main-context";
import Button from "../../components/Button/Button";
import "./JoinCreateGroup.scss";

const JoinCreateGroup = () => {
  const mainCtx = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div className="join-create">
      <h1 className="join-create__heading">join or create a new group</h1>
      <div className="join-create__actions">
        <Button
          type="join-create"
          click={() => navigate(`/${mainCtx.user.username}/join`)}
        >
          join a group
        </Button>
        <Button
          type="join-create"
          click={() => navigate(`/${mainCtx.user.username}/create`)}
        >
          create a new group
        </Button>
      </div>
    </div>
  );
};

export default JoinCreateGroup;
