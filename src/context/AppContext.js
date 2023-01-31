import React, { createContext, useState } from "react";
import { gapi } from "gapi-script";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [userDocs, setUserDocs] = useState(null);
  const [allDocs, setAllDocs] = useState(null);
  const [selectedDocId, setSelectedDocId] = useState(null);

  const contentOfAllDocs = async () => {
    const getDocs = async () => {
      const array = await Promise.all(
        userDocs.map(async (doc) => {
          const docBody = await getDocContent(doc.id);
          return {
            id: doc.id,
            body: docBody,
          };
        })
      );
      return array;
    };

    if (userDocs) {
      const responseArray = await getDocs();

      setAllDocs(responseArray);
    }
  };

  const getDocContent = async (id) => {
    const convertedDocResponse = await gapi.client.drive.files.copy({
      fileId: id,
      mimeType: "application/vnd.google-apps.document",
    });

    const response = await gapi.client.drive.files.export({
      fileId: convertedDocResponse.result.id,
      mimeType: "text/html",
    });

    return response.body;
  };

  return (
    <AppContext.Provider
      value={{
        userDocs,
        setUserDocs,
        contentOfAllDocs,
        setSelectedDocId,
        selectedDocId,
        allDocs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
