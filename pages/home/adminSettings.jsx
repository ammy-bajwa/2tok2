import Layout from '../componets/Layout'
export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message,
      data: req.locals?.data,
    },
  };
}

export default function Index({userName,title,isAdmin}) {
  return (
    <Layout userName={userName} title={title} isAdmin={isAdmin}>
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
        ></div>
        <div class="card-body"></div>
      </div>
    </div>
    </Layout>);
}
