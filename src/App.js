import './App.css'

import {BrowserRouter as Router, Routes} from 'react-router-dom';
import {useEffect, useState} from "react";

import {Provider} from "react-redux";
import {getRoutesByAuth} from "./routes";
import store from "./stores/authStore";

const ONE_MINUTE = 10000

function App() {
  const [isAuthenticate, setAuthenticate] = useState(() => !!store.getState().auth.tokenValue)

  const handleAuth = () => {
    if (!store.getState().auth.tokenExpirationTime) {
        setAuthenticate(false)
        return
    }
  } 

  store.subscribe(() => {
    handleAuth()
  })

  useEffect(() => {
    const interval = setInterval(() => {
        handleAuth()
    }, 100 * ONE_MINUTE);
    return () => clearInterval(interval);
}, [])

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {
            getRoutesByAuth(isAuthenticate, store.getState().auth.user)
          }
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
