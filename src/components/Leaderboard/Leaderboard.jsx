import { useContext } from "react";
import MainContext from "../../store/main-context";
import MemberItem from "../MemberItem/MemberItem";
import "./Leaderboard.scss";

const Leaderboard = () => {
  const mainCtx = useContext(MainContext);

  return (
    <div className="leaderboard">
      <h2 className="leaderboard__heading">Leaderboard</h2>
      <ol className="leaderboard__list">
        {mainCtx.members &&
          mainCtx.members
            .sort((a, b) => b.score - a.score)
            .map((member, i) => (
              <MemberItem
                key={member.userId}
                member={member}
                type="leaderboard"
                index={i + 1}
              />
            ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
