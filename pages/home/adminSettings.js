export async function getServerSideProps({ req }) {
  return {
    props: {},
  };
}

export default function Index({}) {
  return (
  <div id="admin" class="container" style="margin-top: 20px">
    <% if (messages.success) { %>
    <div class="alert alert-success" role="alert"><%- messages.success %></div>
    <% } %> <% if (messages.error) { %>
    <div class="alert alert-danger" role="alert"><%- messages.error %></div>
    <% } %>
  
    <div class="card">
      <div class="card-header" style="padding: 10px 0px 0px 0px; border-bottom: 0px" >
      </div>
      <div class="card-body">
      </div>
    </div>
  </div>
  <Script>
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
  </Script>
  )