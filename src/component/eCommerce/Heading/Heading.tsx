import { useLocation } from "react-router-dom";

const Heading = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <h4
      className={`fw-semibold text-capitalize mb-3 mt-3 ${
        location.pathname === "/" ? "text-center text-decoration-underline" : ""
      }`}
    >
      {children}
    </h4>
  );
};

export default Heading;
