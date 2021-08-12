export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message,
      data: req.locals?.data,
    },
  };
}

export default function Index({ message, data }) {
  return (
    <div id="admin" class="container" style="margin-top: 20px">
      {messages.success && (
        <div class="alert alert-success" role="alert">
          {messages.success}
        </div>
      )}
      {messages.error && (
        <div class="alert alert-danger" role="alert">
          {messages.error}
        </div>
      )}

      <div class="card">
        <div
          class="card-header"
          style="padding: 10px 0px 0px 0px; border-bottom: 0px"
        >
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                class="nav-item nav-link active"
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
                class="nav-item nav-link"
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
                class="nav-item nav-link"
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
        </div>
        <div class="card-body">
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-trades"
              role="tabpanel"
              aria-labelledby="nav-trades-tab"
            >
              {data?.trade_data?.length && (
                <table class="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User</th>
                      <th scope="col">Email</th>
                      <th scope="col">Datetime</th>
                      <th scope="col">Buy Amount</th>
                      <th width="col">Currency</th>
                      <th scope="col">Sell Amount</th>
                      <th width="col">Currency</th>
                      <th width="col">Fee</th>
                      <th width="col">Status</th>
                      <th width="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.trade_data?.map((_item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{_item.username}</td>
                        <td>{_item.email}</td>
                        <td>{new Date(_item.createdat).toLocaleString()}</td>
                        <td>{_item.buy}</td>
                        <td>{_item.buycurrency}</td>
                        <td>{_item.sell}</td>
                        <td>{_item.sellcurrency}</td>
                        <td>{_item.fee}</td>
                        <td>{_item.status}</td>
                        <td>
                          <div
                            class="btn-group btn-group-toggle"
                            data-toggle="buttons"
                          >
                            <label class="btn btn-success ">Approve</label>
                            <label class="btn btn-danger">Cancel</label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!data?.trade_data?.length && (
                <p class="text-center">No Trades!</p>
              )}
            </div>
            <div
              class="tab-pane fade"
              id="nav-deposits"
              role="tabpanel"
              aria-labelledby="nav-deposits-tab"
            >
              {data?.deposits_data?.length && (
                <table class="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User</th>
                      <th scope="col">Email</th>
                      <th scope="col">DateTime</th>
                      <th scope="col">Reference</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Fee</th>
                      <th scope="col">Total</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Status</th>
                      <th width="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.deposits_data?.map((_item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{_item.username}</td>
                        <td>{_item.email}</td>
                        <td>
                          {new Date(
                            data?.deposits_data[i].createdat
                          ).toLocaleString()}
                        </td>
                        <td>{_item.ref}</td>
                        <td>{_item.amount}</td>
                        <td>{_item.fee}</td>
                        <td>{_item.amount}</td>
                        <td>{_item.currency}</td>
                        <td>{_item.status}</td>
                        <td>
                          <div
                            class="btn-group btn-group-toggle"
                            data-toggle="buttons"
                          >
                            <label class="btn btn-success">Approve</label>
                            <label class="btn btn-danger">Cancel</label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {!data?.deposits_data?.length && (
                <p class="text-center">No Deposits!</p>
              )}
            </div>
            <div
              class="tab-pane fade"
              id="nav-withdrawals"
              role="tabpanel"
              aria-labelledby="nav-withdrawals-tab"
            >
              {data?.withdrawals_data?.length && (
                <table class="table table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User</th>
                      <th scope="col">Email</th>
                      <th scope="col">DateTime</th>
                      <th scope="col">Reference</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Fee</th>
                      <th scope="col">Total</th>
                      <th scope="col">Currency</th>
                      <th scope="col">Status</th>
                      <th width="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.withdrawals_data?.map((_item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {new Date(
                            data?.withdrawals_data[i].createdat
                          ).toLocaleString()}
                        </td>
                        <td>{_item.username}</td>
                        <td>{_item.email}</td>
                        <td>{_item.ref}</td>
                        <td>{_item.amount}</td>
                        <td>{_item.fee}</td>
                        <td>{_item.amount}</td>
                        <td>{_item.currency}</td>
                        <td>{_item.status}</td>
                        <td>
                          <div class="btn-group btn-group-toggle">
                            <label class="btn btn-success ">Approve</label>
                            <label class="btn btn-danger">Cancel</label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!data?.withdrawals_data?.length && (
                <p class="text-center">No withdrawals!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Script>
  var notyf = new Notyf(); 
  var app = new Vue({
    el: '#admin', 
    data: {
    }, 
    methods: {
      approveTrade: function (id) {
        fetch(`/api/trade/approve/${id}`,{method:'put'})
        .then(response => response.json())
        .then(data => {if(data?.error){notyf.error(data?.error)}else{location.reload()}});
      },
      approveTransaction: function (id) {
        fetch(`/api/transaction/approve/${id}`,{method:'put'})
        .then(response => response.json())
        .then(data => {if(data?.error){notyf.error(data?.error)}else{location.reload()}});
      },
      cancelTrade: function (id) {
        fetch(`/api/trade/cancel/${id}`,{method:'put'})
        .then(response => response.json())
        .then(data => {if(data?.error){notyf.error(data?.error)}else{location.reload()}});
      },
      cancelTransaction: function (id) {
        fetch(`/api/transaction/cancel/${id}`,{method:'put'})
        .then(response => response.json())
        .then(data => {if(data?.error){notyf.error(data?.error)}else{location.reload()}});
      },
     }
  })
</Script> */}
    </div>
  );
}
