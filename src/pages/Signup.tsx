import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const role = query.get("role");

  useEffect(() => {
    if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else if (role === "parent") {
      navigate("/parent/dashboard");
    } else if (role === "school") {
      navigate("/school/dashboard");
    }
  }, [role, navigate]);

  return <div>{/* Signup form content */}</div>;
};

export default Signup;
