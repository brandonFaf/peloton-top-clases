import React from 'react';
import { Workout } from '../models/data';

const DataList: React.FC<{ data: Workout[]; duration: string }> = ({
  data,
  duration
}) => {
  const formatDate = (d: Date) =>
    `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
  const sorted = data.sort((a, b) => b.totalOutput - a.totalOutput);
  return (
    <>
      <h2>
        {duration} minutes: {sorted[0].totalOutput}
      </h2>
      <hr />
      <ul>
        {sorted.slice(0, 5).map(w => {
          return (
            <li>
              <div>{w.totalOutput}</div>
              <div>{formatDate(new Date(w.date))}</div>
              <div>{w.title}</div>
              <div>{w.instructor}</div>
              <div>dificulty: {w.difficulty.toFixed(2)}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default DataList;
