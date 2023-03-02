import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component }) => {
  const users = useSelector((state) => state.userReducer);

  return (
    <Route
      render={() => {
        return users && users.length > 0 ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
