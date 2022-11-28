import { useContext } from "react";
import MainContext from "../../store/main-context";
import "./SwitchGroup.scss";

const SwitchGroup = ({ username, type }) => {
  const mainCtx = useContext(MainContext);

  const handleGroupChange = event =>
    mainCtx.changeGroup(username, event.target.value, type);

  return (
    <div className={`switch switch--${type}`}>
      {mainCtx.userGroups && (
        <select
          className="switch__select"
          name="chosenGroup"
          defaultValue={mainCtx.currentGroup}
          onChange={handleGroupChange}
        >
          {mainCtx.userGroups.map(({ id, groupName }) => (
            <option key={id} className="switch__option" value={groupName}>
              {groupName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SwitchGroup;
