import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import MainContext from "../../store/main-context";
import defaultProfileImg from "../../assets/images/default-profile-image.png";
import SwitchGroup from "../../components/SwitchGroup/SwitchGroup";
import "./Profile.scss";
import NoGroup from "../../components/NoGroup/NoGroup";
import Button from "../../components/Button/Button";

const Profile = () => {
  const mainCtx = useContext(MainContext);
  const params = useParams();

  useEffect(() => {
    mainCtx.getProfileData(params.username, mainCtx.currentGroup);
  }, [params, mainCtx]);

  return (
    <>
      {mainCtx.currentGroup ? (
        <div className="profile">
          <SwitchGroup username={params.username} />
          {/* {mainCtx.user.username !== params.username &&
            mainCtx.profile.groupName === mainCtx.currentGroup && (
              <Button type="compare-stats">matches history</Button>
            )} */}
          {mainCtx.profile &&
          mainCtx.profile.groupName === mainCtx.currentGroup ? (
            <>
              <div className="profile__img-container">
                <img
                  src={
                    mainCtx.profile.image
                      ? mainCtx.profile.image
                      : defaultProfileImg
                  }
                  alt="profile"
                  className="profile__img"
                />
              </div>
              <h2>
                {mainCtx.profile.firstName} {mainCtx.profile.lastName} (
                {mainCtx.profile.username}) ({mainCtx.currentGroup})
              </h2>
              <p>score: {mainCtx.profile.score}</p>
              <p>wins: {mainCtx.profile.wins}</p>
              <p>loses: {mainCtx.profile.loses}</p>
              <p>matches: {mainCtx.profile.matches}</p>
              <p>whitewashes: {mainCtx.profile.whitewashes}</p>
              <p>whitewashed: {mainCtx.profile.whitewashed}</p>
              <p>tournaments: {mainCtx.profile.tournaments}</p>
              <p>tournaments won: {mainCtx.profile["tournaments won"]}</p>
              <p>leagues: {mainCtx.profile.leagues}</p>
              <p>leagues won: {mainCtx.profile["leagues won"]}</p>
            </>
          ) : (
            <div className="profile__not-member-container">
              <h2 className="profile__not-member">
                this user ({params.username}) is not a member of{" "}
                {mainCtx.currentGroup}
              </h2>
            </div>
          )}
        </div>
      ) : (
        <NoGroup />
      )}
    </>
  );
};

export default Profile;
