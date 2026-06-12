import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RepositoryStructure from "./pages/RepositoryStructure";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />
        <Route
 path="/dashboard"
 element={<Dashboard />}
/>
<Route
  path="/repository/:repoId"
  element={<RepositoryStructure />}
/>
      </Routes>

    </BrowserRouter>
  );

}

export default App;