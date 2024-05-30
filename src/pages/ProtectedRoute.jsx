/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = UseAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null ;
}
