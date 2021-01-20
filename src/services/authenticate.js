export default async (username, password) => {
  const res = await fetch('https://pelotop-server.vercel.app//api/login', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    }),
    credentials: 'include'
  });
  const { user_id, error } = await res.json();
  if (error) {
    throw new Error(error);
  }
  return user_id;
};
