import React from "react";
import { useLocation, Link } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const errorMessage = location.state?.message || "An error occurred.";

  return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
      <Link to="/" className="btn btn-primary">
        Go Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
