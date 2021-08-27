const RegisterForm = ({ messages }) => (
  <form id="registration-form" method="post" autoComplete="off">
    <input
      type="hidden"
      name="_csrf-frontend"
      value="NPzieYimaD0zlGsCgmqlkoYbH6aaVmUcLNEzPaDIm14BzYkj38AMclvWOGe6GeHYxEgplNVvOnFAuVcM2I3-ag=="
    />
    <div className="form-group field-registrationform-email required">
      <input
        type="text"
        id="registrationform-userName"
        className="form-control"
        name="username"
        placeholder="Full Name"
        aria-required="true"
      />
      <p className="help-block help-block-error"></p>
    </div>
    <div className="form-group field-registrationform-email required">
      <input
        type="email"
        id="registrationform-email"
        className="form-control"
        name="email"
        placeholder="Email"
        aria-required="true"
      />
      <p className="help-block help-block-error"></p>
    </div>
    <div className="form-group field-registrationform-password required">
      <input
        type="password"
        id="registrationform-password"
        className="password-hide-show form-control"
        name="password"
        placeholder="Password"
        aria-required="true"
      />
      <p className="help-block help-block-error"></p>
    </div>
    <div className="form-group field-registrationform-password_confirm required">
      <input
        type="password"
        id="registrationform-password_confirm"
        className="password-hide-show form-control"
        name="confirmPassword"
        placeholder="Confirm Password"
        aria-required="true"
      />
      <p className="help-block help-block-error"></p>
    </div>
    <div className="form-group field-registrationform-terms required">
      <div className="checkbox">
        <input type="hidden" name="RegistrationForm[terms]" value="0" />
        <input
          type="checkbox"
          id="registrationform-terms"
          name="RegistrationForm[terms]"
          value="1"
          aria-required="true"
        />
        <label htmlFor="registrationform-terms">
          I have read and accept the{" "}
          <a className="underline" href="terms-of-use.html" target="_blank">
            Terms and Conditions
          </a>
        </label>
      </div>
      <p className="help-block help-block-error"></p>
    </div>

    <input
      type="submit"
      className="btn btn-primary input-100 "
      name="login-button"
      value="Sign up"
    ></input>
  </form>
);
export default RegisterForm;
