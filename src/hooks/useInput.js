import { useState } from 'react';

function useInput(dafaultValue = '') {
  const [value, setValue] = useState(dafaultValue);

  function handleValue({ target }) {
    setValue(target.value);
  }

  return [value, handleValue, setValue];
}

export default useInput;
