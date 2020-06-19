import React, { useState } from 'react';

const useFormFields = (initialState) => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (e) => {
      setValues({
        ...fields,
        [e.target.id]: e.target.value
      });
    },
    () => setValues(initialState)
  ];
}

export default useFormFields
