import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../../store/main-context";
import SwitchGroup from "../../components/SwitchGroup/SwitchGroup";
import Members from "../../components/Members/Members";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import "./Group.scss";
import NoGroup from "../../components/NoGroup/NoGroup";
import StatsTable from "../../components/StatsTable/StatsTable";
import Button from "../../components/Button/Button";

const Group = () => {
  const mainCtx = useContext(MainContext);
  const navigate = useNavigate();

  return (
    <div className="group">
      {mainCtx.currentGroup ? (
        <>
          <SwitchGroup username={mainCtx.user.username} type="group" />
          <h1 className="group__heading">{mainCtx.currentGroup}</h1>
          <div className="group__actions">
            {mainCtx.admin && (
              <Button
                type="moderate-group"
                click={() =>
                  navigate(
                    `/${mainCtx.baseURL}/group/${mainCtx.currentGroup}/moderate`
                  )
                }
              >
                moderate group
              </Button>
            )}
          </div>
          <StatsTable />
          <div className="group__asides">
            <Leaderboard />
            <div className="group__asides--seperator"></div>
            <Members />
          </div>
        </>
      ) : (
        <NoGroup />
      )}
    </div>
  );
};

export default Group;
