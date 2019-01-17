/*
  CACHE ISHH
*/
export const cacheSET = (key, data) => {
  if(typeof data !== 'string') {
    data = JSON.stringify(data)
  }
  sessionStorage.setItem(key, data)
}
export const cacheREMOVE = (key) => {
  try{
    sessionStorage.removeItem(key)
  } catch (e) {
    return console.error('Could not remove item', key)
  }
}
export const cacheGET = (key) => {
  const data = sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (e) {
    return data
  }
}

/*
  FETCH ISHH
*/
export const POST = (path, data) => {
  return fetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}