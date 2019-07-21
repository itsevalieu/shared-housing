import React from 'react';

export const FetchWrapper = ({ useFetch }) => {
  const [state, dispatch] = useFetch;
  return <div value={{ state, dispatch }}></div>;
};

export default FetchWrapper;
