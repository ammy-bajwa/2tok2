import { Layout } from "./componets/Layout";

export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals?.message || "something wrong!",
      error: req.locals?.error || {},
    },
  };
}

export default function Logs({}) {
  return (
    <Layout>
      <h1>Logs</h1>
    </Layout>
  );
}
