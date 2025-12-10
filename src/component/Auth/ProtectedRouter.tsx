import { useAppSelector } from "@/store/hooks";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.auth);

  if (!accessToken) {
    return <Navigate to="/login?message=you_are_not_logged_in" />;
  }
  return <>{children}</>;
};

export default ProtectedRouter;
