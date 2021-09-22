import React, { FC, Suspense } from "react";

import { BrowserRouter } from "react-router-dom";

import RoutesSwitch from "./components/RoutesSwitch";
import routes from "./routes";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <RoutesSwitch routes={routes} />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
