import { useContext, useState, useEffect } from "react";
import MainContext from "../../store/main-context";
import StatsTableRecord from "../StatsTableRecord/StatsTableRecord";
import sort from "../../assets/icons/sort.svg";
import "./StatsTable.scss";

const fields = [
  "wins",
  "loses",
  "matches",
  "pts for",
  "pts against",
  "whitewashes",
  "whitewashed",
  "tournaments",
  "tournaments won",
  "leagues",
  "leagues won",
  "score",
];

const StatsTable = () => {
  const [fieldNameState, setFieldNameState] = useState(null);
  const [sortReverse, setSortReverse] = useState(false);
  const mainCtx = useContext(MainContext);

  const handleFieldSort = async event => {
    const fieldName = event.target.name
      ? event.target.name
      : event.target.innerText;

    setFieldNameState(fieldName);

    fieldName === fieldNameState
      ? setSortReverse(prevState => !prevState)
      : setSortReverse(false);

    mainCtx.sortGroupStats(fieldName, sortReverse);
  };

  return (
    <div className="stats-table">
      <h2 className="stats-table__heading">Stats</h2>
      <div className="stats-table__table">
        <div className="stats-table__fields">
          <span
            className="stats-table__field stats-table__field--username"
            name="username"
            onClick={handleFieldSort}
          >
            username
            <img
              src={sort}
              name="username"
              alt="stats table sort icon"
              className="stats-table__field-icon"
            />
          </span>
          {fields.map((field, i) => (
            <span
              className={
                i % 2 === 0
                  ? "stats-table__field"
                  : "stats-table__field stats-table__field--alternative"
              }
              key={i}
              name={field}
              onClick={handleFieldSort}
            >
              {field}
              <img
                src={sort}
                name={field}
                alt="stats table sort icon"
                className="stats-table__field-icon"
              />
            </span>
          ))}
        </div>
        {mainCtx.currentGroupStats && (
          <ul className="stats-table__records">
            {mainCtx.currentGroupStats.map(stats => (
              <StatsTableRecord key={stats.id} stats={stats} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StatsTable;
