import React, { useContext, useCallback, useEffect, useState } from 'react';

const PathnameContext = React.createContext(null);
const UpdateContext = React.createContext(() => {});

const getPathname = () => `${window.location.pathname}`;

const BrowserPathname = ({children}) => {
  const [location, setLocation] = useState(getPathname());

  const setCurrentBrowserPathname = useCallback(() => {
    setLocation(getPathname());
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', setCurrentBrowserPathname);

    return () => {
      window.removeEventListener('popstate', setCurrentBrowserPathname);
    };
  }, [setCurrentBrowserPathname]);

  return (
    <UpdateContext.Provider value={setCurrentBrowserPathname}>
      <PathnameContext.Provider value={location}>{children}</PathnameContext.Provider>
    </UpdateContext.Provider>
  );
};

export const useBrowserPathname = () => useContext(PathnameContext);

export const usePushPath = () => {
  const setCurrentBrowserPathname = useContext(UpdateContext);

  return useCallback(path => {
    window.history.pushState({}, null, path);
    setCurrentBrowserPathname();
  },[setCurrentBrowserPathname]);
};

export const useReplacePath = () => {
  const setCurrentBrowserPathname = useContext(UpdateContext);

  return useCallback(path => {
    window.history.replaceState({}, null, path);
    setCurrentBrowserPathname();
  },[setCurrentBrowserPathname]);
};

export default BrowserPathname;
