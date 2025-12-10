import { Container } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import Header from "../component/common/header/Header";
import Footer from "../component/common/footer/Footer";

const MainLayout = () => {
  return (
    <Container
      className="d-flex flex-column pt-3"
      style={{
        minHeight: "100vh",
      }}
    >
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
};

export default MainLayout;
