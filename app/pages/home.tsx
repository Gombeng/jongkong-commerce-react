import { useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { googleLogout } from "@react-oauth/google";
import { useEffect, useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userName = JSON.parse(userData).name;
      setUser(userName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/");
  };

  return (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold">
        Welcome to Jongkong Commerce {user}
      </h1>
      <p className="mt-4">The best place to shop!</p>

      <button className="border border-1 px-6 py-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
