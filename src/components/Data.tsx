import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { data } from '../models/data';
import DataList from './DataList';

const Data = ({ userId, setUser }) => {
  const [data, setData] = useState<data | undefined>();
  const [error, setError] = useState('');
  useEffect(() => {
    const f = async () => {
      let url = `/api/data/${userId}`;
      const response = await fetch(
        'https://dry-gorge-78448.herokuapp.com' + url
      );
      if (response.ok) {
        const d: data = await response.json();
        setData(d);
      } else {
        setError('there was a problem');
      }
    };
    f();
  }, [userId]);

  if (error)
    return (
      <>
        <div>failed to load</div>
        <button
          onClick={() => {
            localStorage.removeItem('userId');
            setUser(null);
          }}
        >
          logout
        </button>
      </>
    );
  if (!data) return <div>loading...</div>;
  return (
    <>
      <button onClick={() => localStorage.removeItem('userId')}>logout</button>
      <h1>Total Cycles: {data.count}</h1>
      <h1>
        Total without minis:{' '}
        {data.count - data.workouts[10].length - data.workouts[5].length}
      </h1>
      {Object.keys(data.workouts).map(k => {
        return <DataList data={data.workouts[k]} duration={k} />;
      })}
    </>
  );
};

export default Data;
