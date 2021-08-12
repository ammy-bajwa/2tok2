export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message,
      data: req.locals?.data,
    },
  };
}

export default function Index({}) {
  return (
    <div class="container" style="margin-top: 20px">
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
        <div class="card-header">
          <ul class="nav nav-pills w-100">
            <li class="nav-pill active">
              <a class="nav-link">Balances</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          {data && (
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Currency</th>
                  <th scope="col">Total</th>
                  <th width="200px">Valuation</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).forEach(function (prop) {
                  <tr>
                    <td>{prop}</td>
                    <td>{data[prop]}</td>
                    <td></td>
                  </tr>;
                })}
              </tbody>
            </table>
          )}

          {(!data || data == {}) && <p class="text-center">No Balance!</p>}
        </div>
      </div>
    </div>
  );
}
