export default async (username, password) => {
  const res = await fetch('http://localhost:8080/login', {
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
