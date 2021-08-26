export const addScriptsInBody = () => {
  const script = document.createElement("script");
  script.src =
    "http://www.google.com/recaptcha/api.js?hl=en&amp;render=explicit&amp;onload=recaptchaOnloadCallback";
  script.async = true;
  document.body.appendChild(script);
  const script2 = document.createElement("script");
  script2.src = "/assets/8/8f271511da/cfd4ba49/jquery.js";
  script2.async = true;
  document.body.appendChild(script2);
  const script3 = document.createElement("script");
  script3.src = "/assets/8/8f271511da/2de337b0/vendor/modernizr.custom.js";
  script3.async = true;
  document.body.appendChild(script3);
  const script4 = document.createElement("script");
  script4.src = "/assets/8/8f271511da/2de337b0/vendor/modernizr.custom.js";
  script4.async = true;
  document.body.appendChild(script4);
  const script8 = document.createElement("script");
  script8.src = "/assets/8/8f271511da/32384b8a/js/sweetalert-dev.js";
  script8.async = true;
  document.body.appendChild(script8);
  const script9 = document.createElement("script");
  script9.src = `jQuery(function ($) {jQuery(".password-hide-show").hidePassword(true)});`;
  script9.async = true;
  document.body.appendChild(script9);
};
