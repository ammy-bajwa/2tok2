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
              <a class="nav-link">Users</a>
            </li>
          </ul>
        </div>
        <div class="card-body">
          {data.length && (
            <table class="table table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">ETH Address</th>
                  <th width="200px">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((_item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{_item.username}</td>
                    <td>{_item.email}</td>
                    <td>{_item.token}</td>
                    <td>
                      {_item.admin != 1 && _item.active != 0 && (
                        <a
                          class="btn btn-danger delete"
                          onclick="return alert('Are You sure?')"
                          href={`user/delete/${_item.id}`}
                        >
                          Deactivate
                        </a>
                      )}
                      {_item.admin == 1 && "Admin"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!data.length && <p class="text-center">No user found!</p>}
        </div>
      </div>
    </div>
  );
}
