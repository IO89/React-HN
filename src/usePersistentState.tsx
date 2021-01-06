import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export const usePersistentState = (
  key: string,
  initialState: string
): [string, Dispatch<SetStateAction<string>>] => {
  const isMounted = useRef(false);

  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};
