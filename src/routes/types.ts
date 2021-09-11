import { RouteComponentProps } from "react-router";

export interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = Record<string, never>>
  extends RouteComponentProps<Params> {
  route?: RouteConfig;
}

export interface RouteConfig {
  component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType<any>;
  render?: (p: RouteConfigComponentProps<any>) => React.ReactNode;
  path?: string | string[];
  exact?: boolean;
  sensitive?: boolean;
  strict?: boolean;
  title?: string;
  requireAuth?: boolean;
  redirectPath?: string;
  routes?: RouteConfig[];
}
