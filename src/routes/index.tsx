import About from "@/views/about";
import Home from "@/views/home";
import NotFound from "@/views/not-found";
import { RouteConfig } from "./types";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "*",
    component: NotFound,
  },
];

export default routes;
