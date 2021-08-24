import Layout from "./componets/Layout";
import AdminSettings from "./componets/AdminSettings";
import UserSettings from "./componets/UserSettings";

export async function getServerSideProps({ req }) {
  return {
    props: {
      isAdmin: req.locals?.isAdmin,
      userName: req.locals?.userName,
    },
  };
}

export default function Index({ isAdmin, userName }) {
  // Make a settings form
  return (
    <Layout userName={userName} isAdmin={isAdmin}>
      {isAdmin ? <AdminSettings /> : <UserSettings />}
    </Layout>
  );
}
