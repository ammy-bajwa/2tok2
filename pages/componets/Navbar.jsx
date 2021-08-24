export default function Index() {
  return (
    <nav className="navbar navbar-expand-md fixed-top custom_nav_menu sticky">
      <div className="container">
        {/*<!-- LOGO --> */}
        <a className="navbar-brand logo">
          {/*<!-- <img src="images/csr-live-logo-4.svg" alt="" className="img-fluid logo-light">
             <img src="images/csr-live-logo-4.svg" alt="" className="img-fluid logo-dark"> --> */}
          <h4 style={{ color: "white" }}>1Tok1</h4>
        </a>

        <button
          className="navbar-toggler offcanvas-toggle"
          type="button"
          data-toggle="offcanvas"
          data-target="#js-bootstrap-offcanvas"
          aria-controls="js-bootstrap-offcanvas"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="mdi mdi-menu"></i>
        </button>
        <div
          className="navbar-offcanvas navbar-offcanvas-touch"
          id="js-bootstrap-offcanvas"
        >
          <div className="offcanvas-brand">
            <div className="container">
              <a className="navbar-brand logo">
                {/*<!-- <img src="images/csr-live-logo-4.svg" alt="" className="img-fluid logo-light">
                         <img src="images/csr-live-logo-4.svg" alt="" className="img-fluid logo-dark"> --> */}
                <h4 style={{ color: "white" }}>1Tok1</h4>
              </a>
            </div>
          </div>
          <ul className="navbar-nav ml-auto landing-navbar-dropdown">
            {/*<!-- <li className="nav-item">
                     <a className="nav-link" href="exchange.html">Markets</a>
                 </li>
                 <li className="nav-item">
                     <a className="nav-link" href="https://csrnow.com/" target="_blank">More Info</a>
                 </li> --> */}
            <li className="nav-item">
              <a className="nav-link" href="/user/register">
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/user/login">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
