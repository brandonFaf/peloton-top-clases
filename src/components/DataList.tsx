import { isToday } from 'date-fns';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Workout } from '../models/data';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;
const Top = styled.div`
  width: 100%;
  font-size: 25;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;
const Bottom = styled.div`
  /* display: flex; */
  padding: 0 10px;
`;
const DataList: React.FC<{
  sortBy: 'output' | 'date';
  data: Workout[];
  duration: string;
}> = ({ data, duration, sortBy }) => {
  const [hidden, setHidden] = useState(true);
  const toggle = () => {
    setHidden(!hidden);
  };
  const [length, setLength] = useState(5);
  const showMore = () => setLength(data.length);
  const showLess = () => setLength(5);
  const formatDate = (d: Date) =>
    `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
  if (data.length === 0) {
    return <div></div>;
  }
  let sorted = data.sort((a, b) => b.totalOutput - a.totalOutput);
  const max = sorted[0].totalOutput;
  if (sortBy === 'date') {
    sorted = data.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  return (
    <Container>
      <h2>
        <span onClick={toggle} style={{ paddingRight: 10 }}>
          {hidden ? '+' : '-'}
        </span>
        {duration} minutes: {max}
      </h2>
      <hr style={{ width: '80%' }} />
      {!hidden && (
        <>
          <ol style={{ width: '80%' }}>
            {sorted.slice(0, length).map(w => {
              return (
                <li key={w.id} style={{ paddingBottom: 10 }}>
                  <Top
                    style={{
                      backgroundColor: isToday(w.date) ? 'yellow' : 'white'
                    }}
                  >
                    <div>{w.totalOutput} KJ</div>
                    <div>{formatDate(new Date(w.date))}</div>
                  </Top>
                  <Bottom>
                    <div>{w.title}</div>
                    <div>{w.instructor}</div>
                    <div>Difficulty: {w.difficulty.toFixed(2)}</div>
                  </Bottom>
                </li>
              );
            })}
          </ol>
          {data.length > 5 && length === 5 && (
            <div onClick={showMore}>+ Show More</div>
          )}
          {length > 5 && <div onClick={showLess}>- Show Less</div>}
        </>
      )}
    </Container>
  );
};

export default DataList;
