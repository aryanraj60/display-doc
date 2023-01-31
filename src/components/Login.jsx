import { gapi } from "gapi-script";
import React from "react";
import { SiGoogledrive } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUserDocs } = useContext(AppContext);

  const initClient = () => {
    const DISCOVERY_DOCS = [
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
    ];
    const SCOPES = "https://www.googleapis.com/auth/drive";
    gapi.client
      .init({
        apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY,
        clientId: process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(async () => {
        await gapi.auth2.getAuthInstance().signIn();
        const userDocs = await getWordDocs();
        setUserDocs(userDocs);
        navigate("/home");
      });
  };

  const handleClientLoad = () => {
    gapi.load("client:auth2", initClient);
  };

  const getWordDocs = async () => {
    const response = await gapi.client.drive.files.list({
      q: "trashed = false",
      fields: "nextPageToken, files(id, name)",
    });
    const files = response.result.files;

    const wordDocs = files.filter((file) => {
      return file.name.endsWith(".doc") || file.name.endsWith(".docx");
    });
    return wordDocs;
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-black">
      <button
        className="flex items-center justify-center gap-2 text-white bg-blue-700 rounded-full px-2 py-4"
        onClick={handleClientLoad}
      >
        <SiGoogledrive size={40} />
        <p className="text-2xl">Sign In With Google Drive</p>
      </button>
    </div>
  );
};

export default Login;
