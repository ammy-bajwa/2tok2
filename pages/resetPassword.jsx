import { useState } from "react";
import { updateUserPassword } from "../api/user";
import Layout from "./componets/Layout";

export async function getServerSideProps({ req }) {
  return {
    props: {
      title: "Reset Password",
      token: req.locals?.token || null,
      isAdmin: null,
    },
  };
}

export default function Index({ title, isAdmin, token }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    console.log("Fired");
    event.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
      updateUserPassword(password, token);
    } else {
      return alert("Password is not valid or mismatch");
    }
  };
  return (
    <Layout title={title} isAdmin={isAdmin}>
      <h1 className="text-center text-light mt-5">Reset Password</h1>
      <div className=" d-flex justify-content-center">
        <form className="w-25" onSubmit={handleSubmit}>
          <div className="form-group text-light">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </div>
          <div className="form-group text-light">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              required
              onChange={(e) => setConfirmPassword(e?.target?.value)}
            />
          </div>
          <button type="submit" className="btn btn-danger">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
}
