const DepositModalHome = ({
  options,
  depositCurrency,
  setDepositCurrency,
  setDepositAmount,
  deposit,
  copy,
}) => (
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Deposit
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="form-group" style={{ flex: 1, marginRight: 10 }}>
            <label for="exampleFormControlSelect1">Currency</label>
            <select
              className="form-control"
              onChange={(e) => setDepositCurrency(e.target.value)}
            >
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        {depositCurrency != "ETH" &&
          depositCurrency != "W2" &&
          depositCurrency != "W1" && (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1, marginRight: 10 }}>
                <label for="basic-url">Amount</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">
                      {depositCurrency}
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setDepositAmount(e.target.value)}
                    aria-describedby="basic-addon3"
                  />
                </div>
              </div>
            </div>
          )}
        {(depositCurrency == "ETH" ||
          depositCurrency == "W2" ||
          depositCurrency == "W1") && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 1, marginRight: 10 }}>
              <label for="basic-url">Address</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon3">
                    {depositCurrency}
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  value={token}
                  readonly
                  aria-describedby="basic-addon3"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        {depositCurrency != "ETH" &&
          depositCurrency != "W2" &&
          depositCurrency != "W1" && (
            <button type="button" className="btn btn-primary" onClick={deposit}>
              Deposit
            </button>
          )}
        {(depositCurrency == "ETH" ||
          depositCurrency == "W2" ||
          depositCurrency == "W1") && (
          <button type="button" className="btn btn-primary" onClick={copy}>
            Copy To ClipBoard
          </button>
        )}
      </div>
    </div>
  </div>
);
export default DepositModalHome;
