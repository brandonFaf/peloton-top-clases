import React from 'react';
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
const DataList: React.FC<{ data: Workout[]; duration: string }> = ({
  data,
  duration
}) => {
  const formatDate = (d: Date) =>
    `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;
  const sorted = data.sort((a, b) => b.totalOutput - a.totalOutput);
  return (
    <Container>
      <h2>
        {duration} minutes: {sorted[0].totalOutput}
      </h2>
      <hr style={{ width: '80%' }} />
      <ol style={{ width: '80%' }}>
        {sorted.slice(0, 5).map(w => {
          return (
            <li key={w.id} style={{ paddingBottom: 10 }}>
              <Top>
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
    </Container>
  );
};

export default DataList;
