import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Home = () => {
  const { userDocs, contentOfAllDocs } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDocs) {
      navigate("/");
    } else {
      contentOfAllDocs();
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex-[0.3] border-r-2 border-gray-500">
        <Sidebar userDocs={userDocs} />
      </div>

      <div className="flex-1 h-full overflow-y-auto">
        <Main />
      </div>
    </div>
  );
};

export default Home;
