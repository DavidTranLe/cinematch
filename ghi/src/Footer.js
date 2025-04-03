import React from "react";

function Footer() {
  return (
    <footer
      className="text-center text-lg-start"
      style={{
        backgroundColor: "#000000",
        color: "#696969",
        width: "100%",
        marginTop: "auto",
      }}
    >
      <div className="container p-4 pb-0" style={{ color: "#696969" }}>
        <section className="">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <img
                src="https://i.ibb.co/Y3J7ysp/cinematchlogo2.png"
                alt="Cinematch logo"
                width="250px"
              />
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  About Us
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Press
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Jobs
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Terms of Use
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Privacy
                </button>
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Help Center
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Account
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  FAQ
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Legal
                </button>
              </p>
              <p>
                <button
                  style={{
                    color: "#696969",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  Accessibility
                </button>
              </p>
            </div>
            <hr className="w-100 clearfix d-md-none" />
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
              <p>
                <i className="fas fa-home mr-3" /> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope mr-3" /> contact@cinematch.com
              </p>
              <p>
                <i className="fas fa-phone mr-3" /> + 1 888 333 1111
              </p>
              <p>
                <i className="fas fa-print mr-3" /> + 1 888 333 1111
              </p>
            </div>
          </div>
        </section>
        <hr className="my-3" />
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">© 2025 Copyright: Cinematch</div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              <a
                href="https://www.facebook.com/"
                className="btn btn-outline-light btn-floating m-1"
                role="button"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="https://www.twitter.com/"
                className="btn btn-outline-light btn-floating m-1"
                role="button"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://www.google.com/"
                className="btn btn-outline-light btn-floating m-1"
                role="button"
              >
                <i className="fab fa-google" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="btn btn-outline-light btn-floating m-1"
                role="button"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
