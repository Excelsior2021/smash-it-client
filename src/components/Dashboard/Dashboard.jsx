import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../Leaderboard/Leaderboard";
import SwitchGroup from "../SwitchGroup/SwitchGroup";
import Button from "../Button/Button";
import MainContext from "../../store/main-context";
import NoGroup from "../NoGroup/NoGroup";
import "./Dashboard.scss";

const Dashboard = () => {
  const mainCtx = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      {mainCtx.currentGroup ? (
        <>
          <div className="dashboard__header">
            <SwitchGroup />
            <h1 className="dashboard__heading">
              Hi, {mainCtx.user.firstName}!
            </h1>
          </div>

          <div className="dashboard__actions">
            <Button
              type="record-match"
              click={() => navigate(`/${mainCtx.user.username}/record-match`)}
            >
              record match
            </Button>
            <Button
              type="join-create"
              modifier="dashboard"
              click={() => navigate(`/${mainCtx.user.username}/join-create`)}
            >
              join or create new group
            </Button>
          </div>

          <article className="dashboard__card  dashboard__card--upcoming">
            You have no upcoming matches
          </article>
          <Leaderboard />
        </>
      ) : (
        <NoGroup />
      )}
    </div>
  );
};

export default Dashboard;
