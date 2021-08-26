import { useEffect } from "react";
import UserLoginHead from "../componets/UserLoginHead";
import Footer from "../componets/Footer";
import { addScriptsInBody } from "../helpers/addScripts";
import LoginForm from "../componets/LoginForm";
import { COMPANY_TITLE } from "../constants/company";

export async function getServerSideProps({ req }) {
  return {
    props: { messages: req.locals?.messages || {} },
  };
}

export default function Index({ messages }) {
  useEffect(() => {
    addScriptsInBody();
  }, []);
  return (
    <div>
      <UserLoginHead />
      <div className="simple-page bg-oxygen">
        <div id="video-bg">
          <div className="h-90 overflow">
            <div className="simple-page-wrap h-100">
              <div className="simple-page-logo text-light">
                <a>
                  <h1>{COMPANY_TITLE}</h1>
                </a>
              </div>

              <div className="simple-page-form" id="login-form">
                <h1 className="text-center mb-20">Login</h1>
                <LoginForm />
                <div style={{ height: 20 }}></div>
                {messages.error && (
                  <div className="alert alert-danger" role="alert">
                    {" "}
                    {messages.error}{" "}
                  </div>
                )}
              </div>
              <div className="simple-page-footer">
                <p>
                  <a title="Forgot your password? Change it here!">
                    Forgot your password?
                  </a>
                </p>
                <p>
                  <small>Don't have an account ?</small>
                  <a href="/user/register" title="Sign up here!">
                    Sign up here!
                  </a>
                </p>
              </div>
            </div>
          </div>
          <Footer isBottom />
        </div>
      </div>
    </div>
  );
}
