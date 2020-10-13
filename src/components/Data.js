import React from 'react';
import fetcher from '../services/utils/fetcher';
import useSWR from 'swr';
import DataTable from './DataTable';
const Data = ({ userId, setUser }) => {
  const { data, error } = useSWR(`/api/data/${userId}`, fetcher);
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
      <DataTable data={data} />
    </>
  );
};

export default Data;
