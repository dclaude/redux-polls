// logger reducer
const logger = store => next => action => {
  console.group(action.type)
  console.log('action: ', action)
  /*
  if logger() is the last redux middleware in the chain
  then next contains the dispatch() redux function
  so calling next() will update the store
  */
  const results = next(action)
  console.log('new state: ', store.getState())
  console.groupEnd()
  return results // same as next(action)
}

export default logger

