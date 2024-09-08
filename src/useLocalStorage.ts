import React from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = React.useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      } else {
        return initialValue instanceof Function ? initialValue() : initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [T, typeof setValue];
}
