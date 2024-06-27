// import Icons
import "bootstrap-icons/font/bootstrap-icons.css";
import "remixicon/fonts/remixicon.css";
// import 'boxicons';

// import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// import customised components and styling files
import "./App.css";

import { BrowserRouter, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useEffect, useLayoutEffect, useState } from "react";

import Authenticated from "./routes/Authenticated";
import UnAuthenticated from "./routes/Unauthenticated";
import Loader from "./components/loader";

function App() {
  const { auth } = useSelector((state) => state.auth);
  const [authenticated, setAuthenticated] = useState(false);

  useLayoutEffect(() => {
    if (auth) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [auth]);


  return (
    <React.Suspense fallback={<Loader />}>
      <div className="App">
        <BrowserRouter>
          {authenticated ? (
            <Authenticated isLoggedIn={auth} />
          ) : (
            <UnAuthenticated isLoggedIn={auth} />
          )}
        </BrowserRouter>
      </div>
    </React.Suspense>
  );
}

export default App;
