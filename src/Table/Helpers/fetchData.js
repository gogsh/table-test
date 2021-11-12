export const fetchData = async url => {
  return fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => data)
    .catch(e => console.log(e))
}
