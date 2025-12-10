import { Alert } from "react-bootstrap";

type TLoadingState = {
  children: React.ReactNode;
  status: string;
  error: null | string;
};

const Loading = ({ children, status, error }: TLoadingState) => {
  if (status === "pending") {
    return <p className="fw-semibold fs-3 mt-4"> please wait for loading </p>;
  }

  if (status === "failed") {
    return (
      <Alert className="mt-3" variant="danger">
        {error}
      </Alert>
    );
  }

  return <>{children}</>;
};

export default Loading;
