import React, { FC } from "react";
import { SwitchProps, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedIn } from "@/store/system/systemSlice";
import PrivateRoute from "./PrivateRoute";
import { RouteConfig } from "@/routes/types";

interface RoutesSwitchProps extends SwitchProps {
  routes?: RouteConfig[];
  defaultRedirectPath?: string;
}

const RoutesSwitch: FC<RoutesSwitchProps> = function ({
  routes,
  defaultRedirectPath = "/login",
  ...restProps
}: RoutesSwitchProps) {
  const loggedIn = useSelector(isLoggedIn);
  if (!routes || routes.length <= 0) {
    return null;
  }

  return (
    <Switch {...restProps}>
      {routes.map((route, i) => {
        if (route.requireAuth) {
          return (
            <PrivateRoute
              key={i}
              authenticated={loggedIn}
              redirectPath={route.redirectPath ?? defaultRedirectPath}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) =>
                route.render ? (
                  route.render({ ...props, route: route })
                ) : route.component ? (
                  <route.component {...props} route={route} />
                ) : null
              }
              sensitive={route.sensitive}
            />
          );
        } else {
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) =>
                route.render ? (
                  route.render({ ...props, route: route })
                ) : route.component ? (
                  <route.component {...props} route={route} />
                ) : null
              }
              sensitive={route.sensitive}></Route>
          );
        }
      })}
    </Switch>
  );
};

export default RoutesSwitch;
