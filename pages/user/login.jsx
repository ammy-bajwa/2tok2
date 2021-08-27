import { useEffect, useState } from "react";
import { ErrorToast, SucessToast } from "../../helpers/toastTypes";
import { toast } from "react-nextjs-toast";
import UserLoginHead from "../componets/UserLoginHead";
import Footer from "../componets/Footer";
import { addScriptsInBody } from "../helpers/addScripts";
import LoginForm from "../componets/LoginForm";
import { COMPANY_TITLE } from "../constants/company";
import { sendForgetPasswordEmail } from "../../api/user";
import { validateEmail } from "../helpers/email";

export async function getServerSideProps({ req }) {
  return {
    props: { messages: req.locals?.messages || {} },
  };
}

export default function Index({ messages }) {
  useEffect(() => {
    addScriptsInBody();
  }, []);
  const [email, setEmail] = useState("");

  const handleForgetPassword = () => {
    if (!email && validateEmail(email)) {
      alert("Error in sending password reset email else 1!!");
    } else if (validateEmail(email)) {
      sendForgetPasswordEmail(email)
        .then(({ success, message }) => {
          if (success) {
            alert(message);
          } else {
            alert("Error in sending password reset email! 3!");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Error in sending password reset email!!");
        });
    } else {
      alert("Error in sending password reset email!! else");
    }
  };
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
                <LoginForm setEmail={setEmail} />
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
                  <span
                    className="on_hover"
                    title="Forgot your password? Change it here!"
                    onClick={handleForgetPassword}
                  >
                    Forgot your password?
                  </span>
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
