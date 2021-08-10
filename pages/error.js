export async function getServerSideProps({ req }) {
  return {
    props: {
      message: req.locals.message,
      error: req.locals.error,
    },
  };
}

export default function Error({ message, error }) {
  return (
    <>
      <h1>{message}</h1>
      <h2>{error.status}</h2>
      <pre>{error.stack}</pre>
    </>
  );
}
