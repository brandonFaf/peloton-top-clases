export default async url => {
  const response = await fetch('http://localhost:8080' + url);
  if (response.ok) {
    return await response.json();
  }
  throw new Error('Something went wrong.');
};
