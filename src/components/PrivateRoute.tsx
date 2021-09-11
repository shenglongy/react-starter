import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { RootState } from "@/store";

interface PrivateRouteProps extends RouteProps {
  authenticated: boolean;
  redirectPath: string;
}

const PrivateRoute: FC<PrivateRouteProps> = function ({
  authenticated,
  redirectPath,
  render,
  children,
  component: Component,
  ...restProps
}) {
  const status = useSelector((state: RootState) => state.system.status);
  if (status === "pending") {
    return <div>loading...</div>;
  } else if (status === "error") {
    return <Redirect to={redirectPath} />;
  } else if (status === "success") {
    return (
      <Route
        {...restProps}
        render={(props) => {
          if (authenticated) {
            if (render) {
              return render({ ...props });
            } else if (Component) {
              return <Component {...props} />;
            } else {
              return children;
            }
          } else {
            return <Redirect to={{ pathname: redirectPath }} />;
          }
        }}
      />
    );
  } else {
    return null;
  }
};

export default PrivateRoute;
