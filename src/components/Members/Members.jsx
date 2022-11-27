import { useContext } from "react";
import MainContext from "../../store/main-context";
import MemberItem from "../MemberItem/MemberItem";
import "./Members.scss";

const Members = ({}) => {
  const mainCtx = useContext(MainContext);

  return (
    <div className="members">
      <h2 className="members__heading">Members</h2>
      <ul className="members__list">
        {mainCtx.members &&
          mainCtx.members
            .sort((a, b) => a.firstName.localeCompare(b.firstName))
            .map(member => (
              <MemberItem key={member.userId} member={member} type="members" />
            ))}
      </ul>
    </div>
  );
};

export default Members;
