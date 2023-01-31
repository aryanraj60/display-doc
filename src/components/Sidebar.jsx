import React from "react";
import DisplayDoc from "./DisplayDoc";

const Sidebar = ({ userDocs }) => {
  return (
    <div className="px-5 py-10 space-y-3">
      {userDocs?.map((doc) => (
        <DisplayDoc doc={doc} />
      ))}
    </div>
  );
};

export default Sidebar;
