import { useContext, useState, useEffect } from "react";
import MainContext from "../../store/main-context";
import Input from "../../components/Input/Input";
import defaultProfileImg from "../../assets/images/default-profile-image.png";
import MemberItem from "../../components/MemberItem/MemberItem";
import SwitchGroup from "../../components/SwitchGroup/SwitchGroup";
import Button from "../../components/Button/Button";
import "./RecordMatch.scss";
import Modal from "../../components/Modal/Modal";
import {
  handleChosenMember,
  handleChangeOpponent,
  handleRecordMatchSubmit,
} from "../../utils/helpers";
import { updateStats } from "../../utils/api";

const RecordMatch = () => {
  const mainCtx = useContext(MainContext);
  const [chosenMember, setChosenMember] = useState(null);
  const [modal, setModal] = useState(false);
  const [scores, setScores] = useState({
    userScore: 0,
    opponentScore: 0,
  });
  const [scoresValid, setScoresValid] = useState(false);
  const [submitState, setSubmitState] = useState(null);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const handleSubmit = event => {
    handleRecordMatchSubmit(
      event,
      chosenMember,
      scores,
      setModal,
      setScores,
      setScoresValid,
      submitState
    );
  };

  const submitScores = async () => {
    await updateStats(
      mainCtx.user.username,
      chosenMember.username,
      scores,
      mainCtx.currentGroup
    );
    setSuccessfulSubmit(true);
    mainCtx.getProfileData(mainCtx.user.username);
    mainCtx.getMembersData(mainCtx.currentGroup);
  };

  useEffect(() => {
    setSuccessfulSubmit(false);
  }, [scores]);

  useEffect(() => setChosenMember(null), []);

  return (
    <>
      {chosenMember ? (
        <>
          {scoresValid ? (
            <>
              {!successfulSubmit ? (
                <Modal
                  openModal={modal}
                  setModal={setModal}
                  heading="submit scores"
                  message="Ready to submit the scores?"
                  scores={scores}
                  type="submit-scores"
                  chosenMember={chosenMember}
                  submit={submitScores}
                />
              ) : (
                <Modal
                  openModal={modal}
                  setModal={setModal}
                  heading="submit scores"
                  message="Scores submitted"
                  type="scores-submited"
                />
              )}
            </>
          ) : (
            <Modal
              openModal={modal}
              setModal={setModal}
              heading="invalid scores"
              message="A player has to win by 11 unless it's a whitewash or win by 2"
              type="invalid scores"
            />
          )}
        </>
      ) : (
        <Modal
          openModal={modal}
          setModal={setModal}
          heading="select an opponent"
          message="Please select an opponent in order to submit scores!"
          type="select-opponent"
        />
      )}

      {mainCtx.user && (
        <div className="record-match">
          <SwitchGroup />
          <h1 className="record-match__heading">
            record a match ({mainCtx.currentGroup})
          </h1>
          <div className="record-match__users">
            <article className="record-match__user record-match__user--player">
              <img
                src={
                  mainCtx.user.image ? mainCtx.user.image : defaultProfileImg
                }
                alt="profile"
                className="record-match__img"
              />
              <h2 className="record-match__name">
                {mainCtx.user.firstName} {mainCtx.user.lastName} (
                {mainCtx.user.username})
              </h2>
            </article>
            {chosenMember && (
              <div className="record-match__versus-container">
                <div className="record-match__versus-text">vs</div>
              </div>
            )}
            <article
              className={
                !chosenMember
                  ? "record-match__user"
                  : "record-match__user record-match__user--opponent"
              }
            >
              {!chosenMember && (
                <>
                  <h2>select opponent</h2>
                  <ul className="members__list">
                    {mainCtx.members && mainCtx.members.length > 1 ? (
                      mainCtx.members
                        .sort((a, b) => a.firstName.localeCompare(b.firstName))
                        .filter(
                          member => member.username !== mainCtx.user.username
                        )
                        .map(member => (
                          <MemberItem
                            key={member.userId}
                            member={member}
                            type="record-match"
                            click={() =>
                              handleChosenMember(member, setChosenMember)
                            }
                          />
                        ))
                    ) : (
                      <p>There are no other active members in this group.</p>
                    )}
                  </ul>
                </>
              )}
              {chosenMember && (
                <>
                  <img
                    src={
                      chosenMember.image
                        ? chosenMember.image
                        : defaultProfileImg
                    }
                    alt="profile"
                    className="record-match__img"
                  />
                  <h2 className="record-match__name">
                    {chosenMember.firstName} {chosenMember.lastName} (
                    {chosenMember.username})
                  </h2>
                  <Button
                    type="change-opponent"
                    click={() => handleChangeOpponent(setChosenMember)}
                  >
                    change opponent
                  </Button>
                </>
              )}
            </article>
          </div>
          <form className="record-match__form" onSubmit={handleSubmit}>
            <div className="record-match__inputs">
              <div className="record-match__input">
                <Input
                  form="record-match"
                  name="userScore"
                  label="your score"
                  type="number"
                  setFormState={setScores}
                  value={scores.userScore}
                />
                <Button
                  type="whitewashed"
                  click={() => setSubmitState("whitewashedUser")}
                >
                  whitewashed
                </Button>
                <Button
                  type="winBy2"
                  click={() => setSubmitState("winBy2User")}
                >
                  win by 2
                </Button>
              </div>

              <div className="record-match__input">
                <Input
                  form="record-match"
                  name="opponentScore"
                  label="opponent score"
                  type="number"
                  setFormState={setScores}
                  value={scores.opponentScore}
                />
                <Button
                  type="whitewashed"
                  click={() => setSubmitState("whitewashedOpponent")}
                >
                  whitewashed
                </Button>
                <Button
                  type="winBy2"
                  click={() => setSubmitState("winBy2Opponent")}
                >
                  win by 2
                </Button>
              </div>
            </div>
            <div className="record-match__actions">
              <Button
                type="submit-scores"
                click={() => setSubmitState("submit-scores")}
              >
                submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default RecordMatch;
