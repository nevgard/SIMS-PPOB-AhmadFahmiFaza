const asyncDispatchMiddleware = (storeAPI) => (next) => (action) => {
    if (typeof action.asyncDispatch === 'function') {
      return action.asyncDispatch(storeAPI.dispatch);
    }
    return next(action);
  };
  
  export default asyncDispatchMiddleware;
  