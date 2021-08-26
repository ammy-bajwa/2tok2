const RemainingTimeModal = ({ time, logout, clearMyInterval }) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#remainingTimeModal"
        id="remainingTimeModalLaunch"
      >
        Launch
      </button>

      <div
        className="modal fade"
        id="remainingTimeModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="remainingTimeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="remainingTimeModalLabel">
                Remaining Time
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
            <div className="modal-body">{time}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={logout}
              >
                Logout
              </button>
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={clearMyInterval}
              >
                Keep Me Looged In
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemainingTimeModal;
