import { useState, useContext } from "react";
import MainContext from "../../store/main-context";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import "./CreateGroup.scss";

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState(null);
  const [newGroupValid, setNewGroupValid] = useState(null);
  const [newGroupNameValid, setNewGroupNameValid] = useState(null);
  const mainCtx = useContext(MainContext);

  const handleSubmitGroup = async event => {
    event.preventDefault();
    await mainCtx.isGroupValid(
      newGroup.groupName,
      setNewGroupValid,
      setNewGroupNameValid
    );
  };

  console.log(newGroupValid, newGroupNameValid);

  return (
    <div className="create-group">
      <h1 className="create-group__heading">create a new group</h1>
      <form className="create-group__form" onSubmit={handleSubmitGroup}>
        <div className="create-group__inputs">
          <Input
            form="create-group"
            label="group name"
            name="groupName"
            setFormState={setNewGroup}
            valid={newGroupValid}
            newGroupNameValid={newGroupNameValid}
          />
        </div>
        <div className="create-group__actions">
          <Button type="create-group">create group</Button>
        </div>
      </form>
      <p className="create-group__text">
        when you create a group, you'll automatically become admin, in order to
        manage the group.
      </p>
    </div>
  );
};

export default CreateGroup;
