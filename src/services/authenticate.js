export default async (username, password) => {
  const res = await fetch('https://dry-gorge-78448.herokuapp.com/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    })
  });
  const { user_id, error } = await res.json();
  if (error) {
    throw new Error(error);
  }
  return user_id;
};
