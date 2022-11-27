import { useContext } from "react";
import MainContext from "../../store/main-context";
import Button from "../Button/Button";
import "./Modal.scss";

const ModalContent = ({
  heading,
  message,
  type,
  setModal,
  scores,
  user,
  chosenMember,
  submit,
}) => (
  <div className="modal-content">
    <div className="modal-content__header">
      <h2 className="modal-content__heading">{heading}</h2>
    </div>
    <div className="modal-content__main">
      <p className="modal-content__message">{message}</p>
      {type === "submit-scores" && (
        <div className="modal-content__scores">
          <p>
            {user.username}: {scores.userScore}
          </p>
          <p>
            {chosenMember.username}: {scores.opponentScore}
          </p>
        </div>
      )}
    </div>
    <div className="modal-content__actions">
      <Button
        type="modal-cancel"
        modifier={type !== "submit-scores" ? "long" : null}
        click={() => setModal(false)}
      >
        cancel
      </Button>
      {(type === "submit-scores" || type === "remove-member-group") && (
        <Button type="modal-submit" click={submit}>
          confirm
        </Button>
      )}
    </div>
  </div>
);

const Modal = ({
  openModal,
  setModal,
  heading,
  message,
  scores,
  type,
  chosenMember,
  submit,
}) => {
  const mainCtx = useContext(MainContext);
  return (
    <>
      {openModal && (
        <div className="modal">
          <div className="backdrop" onClick={() => setModal(false)}></div>
          <ModalContent
            heading={heading}
            message={message}
            type={type}
            setModal={setModal}
            scores={scores}
            user={mainCtx.user}
            chosenMember={chosenMember}
            submit={submit}
          />
        </div>
      )}
    </>
  );
};

export default Modal;
