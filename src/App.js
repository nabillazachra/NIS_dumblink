import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";
import PrivateRoute from "./pages/PrivateRoute";

//pages component
import Landing from "./pages/Landing";
import AddLink from "./pages/AddLink";
import Template from "./pages/Template";
import MyLinks from "./pages/MyLinks";
import Profile from "./pages/Profile";
import Published from "./pages/Published";
import NotFound from "./pages/NotFound";

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false) {
      history.push("/");
    } else {
      if (state.user.role === "admin") {
        history.push("/admin");
      } else if (state.user.role === "user") {
        history.push("/template");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <PrivateRoute path="/template" component={Template} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/my-link" component={MyLinks} />
      <PrivateRoute path="/add-link/:id" component={AddLink} />
      <Route exact path="/published/:id" component={Published} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
}

export default App;
