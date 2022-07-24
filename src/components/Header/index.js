import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function Header(props) {
  let navigate = useNavigate();
  const [catOP, setcatOP] = useState(false);
  const setcatOPfun = () => {
    setcatOP(!catOP);
    console.log(catOP);
  };

  const dt = localStorage.getItem("User");
  let user = "";
  if (dt) user = JSON.parse(dt);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            User Dashboard
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {!localStorage.getItem("User") ? (
              <>
                <Nav className="me-auto"></Nav>

                {/* ////////////Before Sign in////////// */}
                <Nav>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signin">
                      SignIn
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      SignUp
                    </NavLink>
                  </li>
                </Nav>
              </>
            ) : (
              <>
                {/* ///////////////////////////// */}
                {/* ////After Sign in ///////////// */}
                <Nav className="me-auto"></Nav>
                <Nav>
                  <li className="nav-item">
                    <div
                      className="nav-link"
                      onClick={setcatOPfun}
                      style={{ float: "right", cursor: "pointer" }}
                    >
                      {user.value.user_data.username}
                      <div
                        className="category-operation cat-user"
                        style={{
                          display: catOP ? "block" : "none",
                          color: "black",
                        }}
                      >
                        <div>
                          <NavLink className="update-link" to="/user/profile">
                            Profile
                          </NavLink>
                        </div>
                        <div>
                          <NavLink
                            className="update-link"
                            to="/user/update-category"
                          >
                            Update Category
                          </NavLink>
                        </div>
                        <div>
                          <NavLink
                            className="update-link"
                            to="/user/update-product"
                          >
                            Update Product
                          </NavLink>
                        </div>
                        {/* <div>Update Category</div>
                        <div>Update Product</div> */}
                        <div
                          onClick={() => {
                            if (!window.confirm("Are you sure to Log-Out"))
                              return;
                            localStorage.clear();

                            // window.location.replace("/");
                            navigate("/");
                          }}
                        >
                          Logout   
                        </div>
                      </div>
                    </div>
                  </li>
                </Nav>
              </>
            )}
            {/* //////////////////////////////// */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
