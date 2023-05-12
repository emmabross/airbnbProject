import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import GetAllSpots from "./components/GetAllSpots";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateSpot";
import UpdateSpot from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && 
      <Switch>
          <Route exact path="/spots/:spotId/edit" component={UpdateSpot} />
          <Route exact path="/spots/new" component={CreateSpot} />
          <Route exact path="/spots/:spotId" component={SingleSpot} />
          <Route exact path="/" component={GetAllSpots} />
          <Route>
            <h1>Page Not Found</h1>
          </Route>
      </Switch>}
     
    </>
  );
}

export default App;