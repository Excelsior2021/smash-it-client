import { useState, useContext } from "react";
import MainContext from "../../store/main-context";
import Input from "../../components/Input/Input";
import "./JoinGroup.scss";
import GroupSearchItem from "../../components/GroupSearchItem/GroupSearchItem";

const JoinGroup = () => {
  const [searchGroupsTerm, setSearchGroupsTerm] = useState("");
  const mainCtx = useContext(MainContext);

  return (
    <div className="join-group">
      <h1 className="join-group__heading">join an existing group</h1>
      <form
        className="join-group__form"
        onSubmit={event => event.preventDefault()}
      >
        <Input
          form="joinGroup"
          label="find a group"
          name="joinGroup"
          type="search"
          setFormState={setSearchGroupsTerm}
        />
      </form>
      {mainCtx.allGroups &&
        searchGroupsTerm.joinGroup &&
        searchGroupsTerm.joinGroup.trim().length > 0 && (
          <ul className="join-group__filtered-groups">
            {mainCtx.allGroups.map(group => {
              if (group.groupName.includes(searchGroupsTerm.joinGroup))
                return (
                  <GroupSearchItem key={group.id} groupName={group.groupName} />
                );
            })}
          </ul>
        )}
    </div>
  );
};

export default JoinGroup;
