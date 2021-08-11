export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default function Index({}) {
  return (
  <div class="container" style="margin-top: 20px">
  <% if (messages.success) { %>
  <div class="alert alert-success" role="alert"><%- messages.success %></div>
  <% } %> <% if (messages.error) { %>
  <div class="alert alert-danger" role="alert"><%- messages.error %></div>
  <% } %>

  <div class="card" >
    <div class="card-header" style="padding: 10px 0px 0px 0px;border-bottom:0px">
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-trades-tab" data-toggle="tab" href="#nav-trades" role="tab" aria-controls="nav-trades" aria-selected="true">Trades</a>
          <a class="nav-item nav-link" id="nav-deposits-tab" data-toggle="tab" href="#nav-deposits" role="tab" aria-controls="nav-deposits" aria-selected="false">Deposits</a>
          <a class="nav-item nav-link" id="nav-withdrawals-tab" data-toggle="tab" href="#nav-withdrawals" role="tab" aria-controls="nav-withdrawals" aria-selected="false">Withdrawals</a>
        </div>
      </nav>
    </div>
    <div class="card-body">
     
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-trades" role="tabpanel" aria-labelledby="nav-trades-tab">
          <% if(data?.trade_data?.length) { %>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Datetime</th>
                  <th scope="col">Buy Amount</th>
                  <th width="col">Currency</th>
                  <th scope="col">Sell Amount</th>
                  <th width="col">Currency</th>
                  <th width="col">Fee</th>
                  <th width="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <% for(var i = 0; i< data?.trade_data?.length; i++) { %>
                <tr>
                  <th scope="row"><%= (i+1) %></th>
                  <td><%= new Date(data?.trade_data[i].createdat).toLocaleString()%></td>
                  <td><%= data?.trade_data[i].buy%></td>
                  <td><%= data?.trade_data[i].buycurrency%></td>
                  <td><%= data?.trade_data[i].sell%></td>
                  <td><%= data?.trade_data[i].sellcurrency%></td>
                  <td><%= data?.trade_data[i].fee%></td>
                  <td><%= data?.trade_data[i].status%></td>
                </tr>
                <% } %>
              </tbody>
            </table>
            <% } %>
      
            <!-- if result is empty -->
            <% if(!data?.trade_data?.length) { %>
            <p class="text-center">No Trades!</p>
            <% } %>
        </div>
        <div class="tab-pane fade" id="nav-deposits" role="tabpanel" aria-labelledby="nav-deposits-tab">
          <% if(data?.deposits_data?.length) { %>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">DateTime</th>
                  <th scope="col">Reference</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Total</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <% for(var i = 0; i< data?.deposits_data?.length; i++) { %>
                <tr>
                  <th scope="row"><%= (i+1) %></th>
                  <td><%= new Date(data?.deposits_data[i].createdat).toLocaleString() %></td>
                  <td><%= data?.deposits_data[i].ref%></td>
                  <td><%= data?.deposits_data[i].amount%></td>
                  <td><%= data?.deposits_data[i].fee%></td>
                  <td><%= data?.deposits_data[i].amount%></td>
                  <td><%= data?.deposits_data[i].currency%></td>
                  <td><%= data?.deposits_data[i].status%></td>
                </tr>
                <% } %>
              </tbody>
            </table>
            <% } %>
      
            <!-- if result is empty -->
            <% if(!data?.deposits_data?.length) { %>
            <p class="text-center">No Deposits!</p>
            <% } %>
        </div>
        <div class="tab-pane fade" id="nav-withdrawals" role="tabpanel" aria-labelledby="nav-withdrawals-tab">
          <% if(data?.withdrawals_data?.length) { %>
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">DateTime</th>
                  <th scope="col">Reference</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Total</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <% for(var i = 0; i< data?.withdrawals_data?.length; i++) { %>
                <tr>
                  <th scope="row"><%= (i+1) %></th>
                  <td><%= new Date(data?.withdrawals_data[i].createdat).toLocaleString() %></td>
                  <td><%= data?.withdrawals_data[i].ref%></td>
                  <td><%= data?.withdrawals_data[i].amount%></td>
                  <td><%= data?.withdrawals_data[i].fee%></td>
                  <td><%= data?.withdrawals_data[i].amount%></td>
                  <td><%= data?.withdrawals_data[i].currency%></td>
                  <td><%= data?.withdrawals_data[i].status%></td>
                </tr>
                <% } %>
              </tbody>
            </table>
            <% } %>
      
            <!-- if result is empty -->
            <% if(!data?.withdrawals_data?.length) { %>
            <p class="text-center">No withdrawals!</p>
            <% } %>
        </div>
      </div>
  
    </div>
  </div>
</div>
<script>
  {/* // $(function () {
  //   $('#myTab li:last-child a').tab('show')
  // }) */}
</script>
  )
            }