export default async (workouts, session_id) => {
  return await Promise.all(
    workouts.map(async w => {
      const res = await fetch(
        `https://api.onepeloton.com/api/workout/${w}/performance_graph`,
        {
          headers: {
            cookie: `peloton_session_id=${session_id}`
          }
        }
      );
      return res.json();
    })
  );
};
