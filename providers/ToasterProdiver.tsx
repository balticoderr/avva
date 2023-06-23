import { Toaster } from "react-hot-toast";

import React from "react";

const ToasterProdiver = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterProdiver;
