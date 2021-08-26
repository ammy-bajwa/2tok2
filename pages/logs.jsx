import Layout from "./componets/Layout";
import LogsTable from "./componets/LogsTable";

export async function getServerSideProps({ req }) {
  return {
    props: {
      data: JSON.parse(req.locals?.data || "{}"),
      userName: req.locals?.userName || null,
      title: "logs",
      isAdmin: req.locals?.isAdmin || null,
    },
  };
}

export default function Index({ data, title, isAdmin }) {
  console.log("data: ", data);
  return (
    <Layout title={title} isAdmin={isAdmin}>
      <div className="text-center">
        <div className="card">
          <div className="card-header">
            <h1>Logs</h1>
          </div>
          <div className="card-body">
            <div
              className="ag-theme-alpine-dark"
              style={{ height: "65vh", width: "100%" }}
            >
              <LogsTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
