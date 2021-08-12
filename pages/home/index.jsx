import Layout from '../componets/Layout'
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: req.locals?.data || {},
      userName: req.locals?.userName,
      isAdmin:req.locals?.isAdmin,
      title:req.locals?.title
    },
  };
}

export default function Index({userName,title,isAdmin,messages,data}) {
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
    <div class="container" style={{marginTop: 20}}>
      {messages?.success && (
        <div class="alert alert-success" role="alert">
          {messages?.success}
        </div>
      )}
      {messages?.error && (
        <div class="alert alert-danger" role="alert">
          {messages?.error}
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
    </Layout>
  );
}
