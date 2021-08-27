import { COMPANY_TITLE } from "../../../company";

export default function Index({ isAdmin, title }) {
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-dark sidebarNavigation"
      data-sidebarClass="navbar-dark bg-dark"
    >
      <div className="container">
        <a className="navbar-brand" href="/">
          {COMPANY_TITLE}
        </a>
        <button
          className="navbar-toggler leftNavbarToggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul className="nav navbar-nav nav-flex-icons ml-auto">
            <li className={`nav-item ${title == "home" ? "active" : ""}`}>
              <a className="nav-link" href="/home">
                Home
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className={`nav-item ${title == "trade" ? "active" : ""}`}>
              <a className="nav-link" href="/trade">
                Trade
              </a>
            </li>
            <li className={`nav-item ${title == "history" ? "active" : ""}`}>
              <a className="nav-link" href="/history">
                History
              </a>
            </li>

            {isAdmin && (
              <li className={`nav-item ${title == "logs" ? "active" : ""}`}>
                <a className="nav-link" href="/logs">
                  Logs
                </a>
              </li>
            )}
            {isAdmin && (
              <>
                <li className={`nav-item ${title == "users" ? "active" : ""}`}>
                  <a className="nav-link" href="/users">
                    Users
                  </a>
                </li>
              </>
            )}
            {isAdmin && (
              <li
                className={`nav-item ${
                  title == "AdminHistory" ? "active" : ""
                }`}
              >
                <a className="nav-link" href="/admin/history">
                  AdminHistory
                </a>
              </li>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                more
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdown01">
                <a className="dropdown-item" href="/news">
                  News
                </a>
                <a className="dropdown-item" href="/kyc">
                  KYC
                </a>
                <a className="dropdown-item" href="/settings">
                  Settings
                </a>
                <a className="dropdown-item" href="/documents">
                  Documents
                </a>
                <a className="dropdown-item" href="/user/logout">
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
