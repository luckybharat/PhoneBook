import "./App.css";
import AppAuthProvider from "./context/Index";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/Frame";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login/Index";

function App(props) {
  return (
    <AppAuthProvider>
      <Switch>
        <Route component={Login} path="/login" exact />
        <PrivateRoute component={HomeScreen} paht="/" exact />
      </Switch>
    </AppAuthProvider>
  );
}

export default App;
