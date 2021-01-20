import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { data } from '../models/data';
import DataList from './DataList';
import styled from 'styled-components';
const Container = styled.div`
  display: grid;
  grid-template-columns: auto;
  @media (min-width: 620px) {
    grid-template-columns: 33% 33% 33%;
    justify-content: center;
    align-content: center;
  }
`;

const Data = ({ userId, setUser }) => {
  const [data, setData] = useState<data | undefined>();
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<'output' | 'date'>('output');
  useEffect(() => {
    const f = async () => {
      let url = `/api/getData/${userId}`;
      const response = await fetch('https://pelotop-server.vercel.app' + url, {
        credentials: 'include'
      });
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
  if (!data)
    return (
      <>
        <div>loading...</div>
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
  return (
    <>
      <button
        onClick={() => {
          localStorage.removeItem('userId');
          setUser(null);
        }}
      >
        logout
      </button>{' '}
      <h1>Total Cycles: {data.count}</h1>
      <h1>
        Total without minis:{' '}
        {data.count - data.workouts[10].length - data.workouts[5].length}
      </h1>
      {sortBy === 'output' && (
        <div onClick={() => setSortBy('date')}>Sort by Date</div>
      )}
      {sortBy === 'date' && (
        <div onClick={() => setSortBy('output')}>Sort by Output</div>
      )}
      <Container>
        {Object.keys(data.workouts).map(k => {
          return (
            <DataList
              sortBy={sortBy}
              data={data.workouts[k]}
              key={k}
              duration={k}
            />
          );
        })}
      </Container>
    </>
  );
};

export default Data;
