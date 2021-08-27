const HomeExchange = ({
  setPayCurrency,
  setReceiveCurrency,
  setPay,
  setReceive,
  options,
  payCurrency,
  receiveCurrency,
  exchange
}) => (
  <>
    <div className="card-header">
      <ul className="nav nav-pills w-100">
        <li className="nav-pill active">
          <a className="nav-link">Exchange</a>
        </li>
      </ul>
    </div>
    <div className="card-body">
      <center>
        <h3>Cryptocurrency exchange</h3>
      </center>
      <span style={{ height: 10, width: "100%", display: "block" }}></span>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="form-group" style={{ flex: 1, marginRight: 10 }}>
          <label for="exampleFormControlSelect1">From currency</label>
          <select
            className="form-control"
            onChange={(e) => setPayCurrency(e.target.value)}
          >
            {options?.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label for="exampleFormControlSelect1">To currency</label>
          <select
            className="form-control"
            onChange={(e) => setReceiveCurrency(e.target.value)}
          >
            {options?.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, marginRight: 10 }}>
          <label for="basic-url">You Pay</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                {payCurrency}
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPay(e.target.value)}
              aria-describedby="basic-addon3"
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <label for="basic-url">You receive</label>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon3">
                {receiveCurrency}
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              onChange={(e) => setReceive(e.target.value)}
              aria-describedby="basic-addon3"
            />
          </div>
        </div>
      </div>
      <span style={{ height: 10, width: "100%", display: "block" }}></span>
      <center>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={exchange}
        >
          Exchange
        </button>
      </center>
      <span style={{ height: 10, width: "100%", display: "block" }}></span>
      <center>
        <p style={{ fontSize: 10 }}>Included fee is: (0.80 %)</p>
      </center>
    </div>
  </>
);

export default HomeExchange;
