import React from "react";
import Album from "./Album";
import { Route, Routes } from "react-router-dom";
import EditPage from "./EditPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Album />} />
        <Route path="/editpage/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
};

export default App;
