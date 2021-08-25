const HistoryNav = () => (
  <nav>
    <div className="nav nav-tabs" id="nav-tab" role="tablist">
      <a
        className="nav-item nav-link active"
        id="nav-trades-tab"
        data-toggle="tab"
        href="#nav-trades"
        role="tab"
        aria-controls="nav-trades"
        aria-selected="true"
      >
        Trades
      </a>
      <a
        className="nav-item nav-link"
        id="nav-deposits-tab"
        data-toggle="tab"
        href="#nav-deposits"
        role="tab"
        aria-controls="nav-deposits"
        aria-selected="false"
      >
        Deposits
      </a>
      <a
        className="nav-item nav-link"
        id="nav-withdrawals-tab"
        data-toggle="tab"
        href="#nav-withdrawals"
        role="tab"
        aria-controls="nav-withdrawals"
        aria-selected="false"
      >
        Withdrawals
      </a>
    </div>
  </nav>
);

export default HistoryNav;
