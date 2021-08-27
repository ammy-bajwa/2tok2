const LoginForm = ({ setEmail }) => (
  <form id="login-form" method="post" autoComplete="off">
    <input
      type="hidden"
      name="_csrf-frontend"
      value="1NnNFoTsqxbr5PWnyaUIhmlXmqL_-JWotWVJKkHhR_zh6KZM04rPWYOmpsLx1kzMKwSskLDBysXZDS0bOaQiyA=="
    />
    <div className="form-group field-loginform-username required">
      <input
        type="email"
        id="loginform-username"
        className="form-control"
        name="email"
        tabIndex="1"
        onChange={(e) => setEmail(e?.target?.value)}
        placeholder="Email"
        aria-required="true"
      />

      <p className="help-block help-block-error"></p>
    </div>
    <div className="form-group field-loginform-password required">
      <input
        type="password"
        id="loginform-password"
        className="password-hide-show form-control"
        name="password"
        tabIndex="2"
        placeholder="Password"
        aria-required="true"
      />

      <p className="help-block help-block-error"></p>
    </div>
    <div className="form-group m-b-xl field-loginform-rememberme">
      <div className="checkbox">
        <input type="hidden" name="LoginForm[rememberMe]" value="0" />
        <input
          type="checkbox"
          id="loginform-rememberme"
          name="LoginForm[rememberMe]"
          value="1"
        />
        <label className="control-label" htmlFor="loginform-rememberme">
          Remember me
        </label>
        <p className="help-block help-block-error"></p>
      </div>
    </div>
    <input
      type="submit"
      className="btn btn-primary input-100"
      name="login-button"
      value="Log In"
    ></input>
  </form>
);

export default LoginForm;
