import { useContext, useState } from "react";
import MainContext from "../../store/main-context";
import MemberItem from "../../components/MemberItem/MemberItem";
import Modal from "../../components/Modal/Modal";
import { removeMemberFromGroup } from "../../utils/api";
import "./ModerateGroup.scss";

const ModerateGroup = () => {
  const mainCtx = useContext(MainContext);
  const [modal, setModal] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState(null);

  const handleRemoveMemberFromGroup = username => {
    setModal(true);
    setMemberToRemove(username);
  };

  const submitRemoveMemberFromGroup = async () => {
    await removeMemberFromGroup(memberToRemove, mainCtx.currentGroup);
    setModal(false);
    setMemberToRemove(null);
    mainCtx.getMembersData(mainCtx.currentGroup);
  };

  return (
    <div className="moderate-group">
      <Modal
        openModal={modal}
        setModal={setModal}
        heading="remove user from group"
        message={
          memberToRemove &&
          `Are you sure you want to remove ${memberToRemove} from ${mainCtx.currentGroup}?`
        }
        type="remove-member-group"
        submit={submitRemoveMemberFromGroup}
      />
      <h1 className="moderate-group__heading">moderate group</h1>
      <h2 className="moderate-group__sub-heading">remove a member</h2>
      <ul className="members__list">
        {mainCtx.members && mainCtx.members.length > 1 ? (
          mainCtx.members
            .sort((a, b) => a.firstName.localeCompare(b.firstName))
            .filter(member => member.username !== mainCtx.user.username)
            .map(member => (
              <MemberItem
                key={member.userId}
                member={member}
                type="moderate-group"
                click={handleRemoveMemberFromGroup}
              />
            ))
        ) : (
          <p>No other active members</p>
        )}
      </ul>
    </div>
  );
};

export default ModerateGroup;
