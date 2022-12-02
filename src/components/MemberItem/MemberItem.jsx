import profileImg from "../../assets/images/default-profile-image.png";
import removeUser from "../../assets/icons/remove-user.png";
import { Link } from "react-router-dom";
import "./MemberItem.scss";
import { useContext } from "react";
import MainContext from "../../store/main-context";

const MemberItemBase = ({ member, type }) => (
  <>
    <img
      src={member.image ? member.image : profileImg}
      alt="profile"
      className={type ? `member__img member__img--${type}` : "member__img"}
    />
    <p className="member__name">
      {member.firstName} {member.lastName} ({member.username})
    </p>
  </>
);

const MemberItem = ({ member, index, type, click }) => {
  const mainCtx = useContext(MainContext);
  return (
    <li className={type ? `member member--${type}` : "member"}>
      {type === "leaderboard" && (
        <Link
          to={`/${mainCtx.baseURL}/${member.username}/profile`}
          className={
            type ? `member__link member__link--${type}` : "member__link"
          }
        >
          <p className="member__rank">{index}</p>
          <MemberItemBase member={member} type="leaderboard" />
          <p className="member__points">{member.score}</p>
        </Link>
      )}

      {type === "members" && (
        <Link
          to={`/${mainCtx.baseURL}/${member.username}/profile`}
          className="member__link"
        >
          <MemberItemBase member={member} />
        </Link>
      )}

      {type === "record-match" && (
        <div className="member__link" onClick={click}>
          <MemberItemBase member={member} />
        </div>
      )}

      {type === "moderate-group" && (
        <div className="member__link">
          <MemberItemBase member={member} />
          <img
            src={removeUser}
            alt="remove-icon"
            className="member__remove-user-icon"
            onClick={() => click(member.username)}
          />
        </div>
      )}
    </li>
  );
};

export default MemberItem;
