'use client';

// https://github.com/streamich/react-use/blob/master/src/useMedia.ts
import { useEffect, useState } from 'react';

/**
 * useMedia - hook to detect media queries
 * @param {string} query - The media query
 * @param {boolean} defaultState - The default state
 * @returns {boolean}
 */
export default function useMedia(query: string, defaultState = false): boolean {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    let mounted = true; // set it to true to make sure the component is mounted
    const mql = window.matchMedia(query); // create a media query list
    function onChange() {
      // check if the component is mounted
      if (!mounted) return;

      // set the state to the media query list
      setState(mql.matches);
    }

    // Add event listener
    mql.addEventListener('change', onChange);

    // Set the state to the media query list
    setState(mql.matches);

    // cleanup
    return () => {
      mounted = false; // set it to false to unmount the component
      mql.removeEventListener('change', onChange); // remove the listener
    };
  }, [query]);

  return state;
}
