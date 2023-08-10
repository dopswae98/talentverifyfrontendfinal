import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Apps = () => {
  const [loadingInProgress, setLoading] = useState(false);

  return (
    <div className="container">
      <div class="spinner-grow" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Apps;
