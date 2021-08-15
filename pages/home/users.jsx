import Layout from "../componets/Layout";
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || {},
      data: JSON.parse(req.locals?.data || '[]'),
      userName:req.locals?.userName || '',
      isAdmin:req.locals?.isAdmin || false,
      title:req.locals?.title || ''
    },
  };
}

export default function Index({ message,data,userName, title, isAdmin }) {
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
      <div class="container" style={{marginTop: 20}}>
        {message.success && (
          <div class="alert alert-success" role="alert">
            {message.success}
          </div>
        )}
        {message.error && (
          <div class="alert alert-danger" role="alert">
            {message.error}
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
    </Layout>
  );
}
