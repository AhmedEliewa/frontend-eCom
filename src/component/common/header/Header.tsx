import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import Cart from "@/component/eCommerce/Cart/Cart";
import Wishlist from "@/component/eCommerce/wishlist/Wishlist";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/authSlice";
import { useEffect } from "react";
import { actWishlist } from "@/store/wishlist/act/actWishlist";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(actWishlist("productsIds"));
    }
  }, [dispatch, accessToken]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h3>
          <Badge
            bg="primary"
            as={NavLink}
            to="/"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            eCom
          </Badge>
        </h3>
        <div className="d-flex gap-2">
          <Wishlist />
          <div className="border-end"></div>
          <Cart />
        </div>
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary p-1 rounded "
        bg="dark"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="custom-toggle position-relative"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="aboutUs">
                About
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown
                    title={`welcome ${user?.firstName} ${user?.lastName}`}
                    id="basic-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item as={NavLink} to="Profile" end>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="Profile/orders">
                      Order
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        dispatch(logout());
                        navigate("/");
                      }}
                    >
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
