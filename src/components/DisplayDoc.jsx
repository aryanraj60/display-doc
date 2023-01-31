import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const DisplayDoc = ({ doc }) => {
  const { setSelectedDocId, allDocs } = useContext(AppContext);

  return (
    <div className="bg-gray-600 rounded-full p-2 cursor-pointer hover:text-blue-600">
      <h2
        onClick={() => {
          if (allDocs) {
            setSelectedDocId(doc.id);
          }
        }}
        className="uppercase"
      >
        {doc.name.replace(".docx", "")}
      </h2>
    </div>
  );
};

export default DisplayDoc;
