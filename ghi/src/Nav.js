import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBNavbar,
  MDBContainer,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBIcon,
  MDBNavbarNav,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
  MDBModalHeader,
} from "mdb-react-ui-kit";
import LoginModal from "./LoginModal";

function Nav({ token, setToken }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showNav, setShowNav] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };

  const logout = async () => {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const fetchConfig = {
      method: "delete",
      credentials: "include",
    };
    await fetch(url, fetchConfig);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setToken(null);
    logout();
    navigate("/");
  };

  useEffect(() => {
    const getName = async () => {
      if (token) {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/accounts/current`;
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          const account_name = await data.name;
          setName(account_name);
        }
      }
    };
    getName();
  }, [token]);

  if (token === null) {
    return (
      <>
        <MDBNavbar expand="lg" dark style={{ backgroundColor: "black" }}>
          <MDBContainer fluid>
            <MDBNavbarBrand href="/">
              <img
                src="https://i.ibb.co/Y3J7ysp/cinematchlogo2.png"
                alt="Cinematch logo"
                width="250"
              />
            </MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowNav(!showNav)}
            >
              <MDBIcon icon="bars" fas />
            </MDBNavbarToggler>
            <MDBCollapse navbar show={showNav}>
              <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                <MDBNavbarItem>
                  <MDBNavbarLink
                    active
                    onClick={toggleLoginModal}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src="https://i.ibb.co/7VXkPzy/login.png"
                      alt="Log In button"
                      width="130"
                    />
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>

        {/* Login Modal */}
        <MDBModal
          show={showLoginModal}
          tabIndex="-1"
          staticBackdrop
          className="login-modal"
        >
          <MDBModalDialog size="lg" centered>
            <MDBModalContent className="login-modal-content">
              <MDBModalHeader className="border-0 bg-transparent">
                <MDBBtn
                  className="btn-close btn-close-white"
                  color="none"
                  onClick={toggleLoginModal}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody className="p-0">
                <LoginModal setToken={setToken} closeModal={toggleLoginModal} />
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    );
  } else {
    return (
      <MDBNavbar expand="lg" dark style={{ backgroundColor: "black" }}>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img
              src="https://i.ibb.co/Y3J7ysp/cinematchlogo2.png"
              alt="Cinematch logo"
              width="250"
            />
          </MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNav(!showNav)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNav}>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active href="/watchlist">
                  <img
                    src="https://i.ibb.co/D95YQPc/cinematchmoviesbutton.png"
                    alt="Watchlist button"
                    width="150"
                  />
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <div className="d-flex align-items-center">
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link me-3">
                  <MDBIcon
                    fas
                    icon="user"
                    style={{ color: "rgb(223, 44, 20)" }}
                  />
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link href="/profile">
                    <MDBIcon fas icon="user" className="me-2" /> Profile
                  </MDBDropdownItem>
                  <MDBDropdownItem link href="/RejectedList">
                    <MDBIcon fas icon="times" className="me-2" /> Rejected
                  </MDBDropdownItem>
                  <MDBDropdownItem link onClick={handleLogout}>
                    <MDBIcon fas icon="sign-out-alt" className="me-2" /> Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
              <div
                className="me-3"
                style={{
                  fontFamily: "Lucida Grande, monospace",
                  fontSize: "17px",
                  color: "rgb(223, 44, 20)",
                  whiteSpace: "nowrap",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                Hello, {name}
              </div>
              <MDBNavbarLink active href="/search">
                <MDBIcon fas icon="search" style={{ color: "white" }} />
              </MDBNavbarLink>
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

export default Nav;
