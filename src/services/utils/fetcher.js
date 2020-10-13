export default url =>
  fetch('http://localhost:8080' + url).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong.');
  });
