import { Route, Routes } from "react-router-dom";
import { privateRoutes } from "../router";

const AppRouter = () => {
  return (
    <Routes>
      {privateRoutes.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          ></Route>
        );
      })}
    </Routes>
  );
};

export default AppRouter;
