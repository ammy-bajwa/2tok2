export async function getServerSideProps({ req }) {
  return {
    props: {
      isAdmin: req.locals?.isAdmin,
      title: req.locals?.title,
    },
  };
}

export default function Index({ isAdmin, title }) {
  return (
    <nav
      class="navbar navbar-expand-md navbar-dark bg-dark sidebarNavigation"
      data-sidebarClass="navbar-dark bg-dark"
    >
      <div class="container">
        <a class="navbar-brand" href="#">
          1tok1
        </a>
        <button
          class="navbar-toggler leftNavbarToggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="nav navbar-nav nav-flex-icons ml-auto">
            <li class={`nav-item ${title == 'home'? 'active':'' }`}>
              <a class="nav-link" href="/home">
                Home
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class={`nav-item ${title == 'trade'? 'active':'' }`}>
              <a class="nav-link" href="/trade">
                Trade
              </a>
            </li>
            <li class={`nav-item ${title == 'history'? 'active':'' }`}>
              <a class="nav-link" href="/history">
                History
              </a>
            </li>
            {isAdmin && (
              <li class={`nav-item ${title == 'users'? 'active':'' }`}>
                <a class="nav-link" href="/users">
                  Users
                </a>
              </li>
            )}
            {isAdmin && (
              <li class={`nav-item ${title == 'AdminHistory'? 'active':'' }`}>
                <a class="nav-link" href="/admin/history">
                  AdminHistory
                </a>
              </li>
            )}
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                id="dropdown01"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                more
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdown01">
                <a class="dropdown-item" href="/news">
                  News
                </a>
                <a class="dropdown-item" href="/kyc">
                  KYC
                </a>
                <a class="dropdown-item" href="/settings">
                  Settings
                </a>
                <a class="dropdown-item" href="/documents">
                  Documents
                </a>
                <a class="dropdown-item" href="/user/logout">
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
