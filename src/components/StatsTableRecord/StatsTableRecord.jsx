import { useState, useEffect } from "react";
import "./StatsTableRecord.scss";

const fieldValues = [
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

const StatsTableRecord = ({ stats }) => {
  const [memberStats, setMemberStats] = useState([]);

  useEffect(() => {
    for (const [key, value] of Object.entries(stats)) {
      if (fieldValues.includes(key)) {
        setMemberStats(prevState => {
          return [...prevState, value];
        });
      }
    }
  }, []);

  return (
    <li className="stats-table-record">
      <span className="stats-table-record__field stats-table-record__field--username">
        {stats.username}
      </span>
      {memberStats.map((value, i) => (
        <span
          key={i}
          className={
            i % 2 === 0
              ? "stats-table-record__field"
              : "stats-table-record__field stats-table-record__field--alternative"
          }
        >
          {value}
        </span>
      ))}
    </li>
  );
};

export default StatsTableRecord;
