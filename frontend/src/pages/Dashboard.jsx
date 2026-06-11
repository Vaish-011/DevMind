import { useEffect } from "react";

function Dashboard() {

  useEffect(() => {

    const params =
      new URLSearchParams(window.location.search);

    const token =
      params.get("token");

    if (token) {

      localStorage.setItem(
        "token",
        token
      );

    }

  }, []);

  return (
    <h1>
      Dashboard
    </h1>
  );
}

export default Dashboard;