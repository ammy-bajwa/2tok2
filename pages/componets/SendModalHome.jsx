const SendModalHome = ({
  setSendTo,
  setSendCurrency,
  options,
  setSendAmount,
  sendCurrency,
  send
}) => (
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Send any currency to other members
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
          <div style={{ flex: 1, marginRight: 10 }}>
            <label for="basic-url">Send to:</label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(e) => setSendTo(e.target.value)}
                placeholder="email"
                aria-describedby="basic-addon3"
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="form-group" style={{ flex: 1, marginRight: 10 }}>
            <label for="exampleFormControlSelect1">Currency</label>
            <select
              className="form-control"
              onChange={(e) => setSendCurrency(e.target.value)}
            >
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1, marginRight: 10 }}>
            <label for="basic-url">Amount</label>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon3">
                  {sendCurrency}
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                onChange={(e) => setSendAmount(e.target.value)}
                aria-describedby="basic-addon3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={send}>
          Send
        </button>
      </div>
    </div>
  </div>
);
export default SendModalHome;
