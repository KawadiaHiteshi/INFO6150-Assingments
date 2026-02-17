/* Part A - Login validations using jQuery */

$(document).ready(function () {
  // Hardcoded users
  const users = [
    { email: "demo@northeastern.edu", password: "Password123" },
    { email: "student@northeastern.edu", password: "Test12345" },
    { email: "hk@northeastern.edu", password: "Northeastern8" }
  ];

  const $email = $("#email");
  const $password = $("#password");
  const $remember = $("#rememberMe");

  const $emailErr = $("#emailErr");
  const $passErr = $("#passErr");
  const $loginErr = $("#loginErr");
  const $loginSuccess = $("#loginSuccess");
  const $loginBtn = $("#loginBtn");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@northeastern\.edu$/;

  const clearMessages = () => {
    $loginErr.stop(true, true).hide().text("");
    $loginSuccess.stop(true, true).hide().text("");
  };

  const setButtonState = () => {
    const emailOk = validateEmail(false);
    const passOk = validatePassword(false);
    $loginBtn.prop("disabled", !(emailOk && passOk));
  };

  const validateEmail = (show = true) => {
    const value = $email.val().trim();

    if (!value || !emailRegex.test(value)) {
      if (show) $emailErr.text("Please enter a valid Northeastern email").show();
      return false;
    }
    if (show) $emailErr.text("").hide();
    return true;
  };

  const validatePassword = (show = true) => {
    const value = $password.val();

    if (!value) {
      if (show) $passErr.text("Password is required").show();
      return false;
    }
    if (value.length < 8) {
      if (show) $passErr.text("Password must be at least 8 characters").show();
      return false;
    }

    if (show) $passErr.text("").hide();
    return true;
  };

  // Clear errors on focus
  $email.on("focus", function () {
    $emailErr.text("").hide();
    clearMessages();
  });
  $password.on("focus", function () {
    $passErr.text("").hide();
    clearMessages();
  });

  // Validate on keyup + blur
  $email.on("keyup blur", function () {
    validateEmail(true);
    setButtonState();
  });

  $password.on("keyup blur", function () {
    validatePassword(true);
    setButtonState();
  });

  // Submit login
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    clearMessages();

    const emailOk = validateEmail(true);
    const passOk = validatePassword(true);

    if (!(emailOk && passOk)) {
      setButtonState();
      return;
    }

    const email = $email.val().trim();
    const password = $password.val();

    // Check credentials (do NOT reveal which is wrong)
    const matched = users.some(u => u.email === email && u.password === password);

    if (!matched) {
      $loginErr
        .text("Invalid email or password")
        .hide()
        .slideDown(220);
      return;
    }

    const sessionData = {
      username: email.split("@")[0],
      email: email,
      loginTime: new Date().toISOString(),
      isLoggedIn: true
    };

    const storage = $remember.is(":checked") ? localStorage : sessionStorage;
    storage.setItem("a6_session", JSON.stringify(sessionData));

    $loginSuccess
      .html(`<strong>Success!</strong> Redirecting to calculator...`)
      .hide()
      .fadeIn(250);

    // Small animation on card
    $(".card").addClass("pulse");

    setTimeout(() => {
      window.location.href = "calculator.html";
    }, 2000);
  });

  // Initial UI state
  $emailErr.hide();
  $passErr.hide();
  $loginErr.hide();
  $loginSuccess.hide();
  setButtonState();
});
