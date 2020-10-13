export default async (user_id, session_id) => {
  const res = await fetch(
    `https://api.onepeloton.com/api/user/${user_id}/workouts`,
    {
      headers: {
        cookie: `peloton_session_id=${session_id}`
      }
    }
  );
  const data = await res.json();
  return data.data
    .filter(w => w.fitness_discipline == 'cycling')
    .map(w => w.id);
};
