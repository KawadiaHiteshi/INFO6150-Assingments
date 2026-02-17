/* Part A - Calculator page */

$(document).ready(function () {
  const getSession = () => {
    const s1 = sessionStorage.getItem("a6_session");
    const s2 = localStorage.getItem("a6_session");
    return s1 || s2;
  };

  const clearSession = () => {
    sessionStorage.removeItem("a6_session");
    localStorage.removeItem("a6_session");
  };

  // Auth check on load
  const sessionRaw = getSession();
  if (!sessionRaw) {
    window.location.href = "login.html";
    return;
  }

  const session = JSON.parse(sessionRaw);
  $("#welcomeTitle").text(`Welcome, ${session.username}!`);

  const $num1 = $("#num1");
  const $num2 = $("#num2");
  const $res = $("#result");
  const $num1Err = $("#num1Err");
  const $num2Err = $("#num2Err");
  const $calcErr = $("#calcErr");

  const numberRegex = /^-?\d*\.?\d+$/;

  const clearCalcMsg = () => $calcErr.stop(true, true).hide().text("");

  const showFieldError = ($el, $errEl, msg) => {
    $errEl.text(msg).show();
    $el.addClass("input--error");
  };

  const clearFieldError = ($el, $errEl) => {
    $errEl.text("").hide();
    $el.removeClass("input--error");
  };

  const validateNumber = ($el, $errEl) => {
    const v = $el.val().trim();
    if (!v || !numberRegex.test(v)) {
      showFieldError($el, $errEl, "Please enter a valid number");
      return false;
    }
    clearFieldError($el, $errEl);
    return true;
  };

  // REQUIRED: Single Arrow Function for all operations
  const calculate = (num1, num2, operation) => {
    switch (operation) {
      case "add": return num1 + num2;
      case "subtract": return num1 - num2;
      case "multiply": return num1 * num2;
      case "divide":
        if (num2 === 0) return "Cannot divide by zero";
        return num1 / num2;
      default:
        return "Invalid operation";
    }
  };

  // Clear error on focus
  $num1.on("focus", function () { clearFieldError($num1, $num1Err); clearCalcMsg(); });
  $num2.on("focus", function () { clearFieldError($num2, $num2Err); clearCalcMsg(); });

  // Operation buttons
  $(".opBtn").on("click", function () {
    clearCalcMsg();

    const ok1 = validateNumber($num1, $num1Err);
    const ok2 = validateNumber($num2, $num2Err);

    if (!(ok1 && ok2)) {
      $res.val("").prop("disabled", true);
      return;
    }

    const n1 = parseFloat($num1.val().trim());
    const n2 = parseFloat($num2.val().trim());
    const op = $(this).data("op");

    const result = calculate(n1, n2, op);

    if (typeof result === "string") {
      $calcErr.text(result).hide().slideDown(180);
      $res.val("").prop("disabled", true);
      return;
    }

    // jQuery chaining required / nice
    $res
      .prop("disabled", false)
      .val(result)
      .addClass("flash");

    setTimeout(() => $res.removeClass("flash"), 300);
  });
// --- Keypad logic: types into active input (num1 or num2) ---
let activeField = "#num1";
const $activeLabel = $("#activeFieldLabel");

const setActive = (sel) => {
  activeField = sel;
  const name = sel === "#num1" ? "Number 1" : "Number 2";
  $activeLabel.text(`Active: ${name}`);
};

// Switch active field when user focuses
$("#num1").on("focus click", () => setActive("#num1"));
$("#num2").on("focus click", () => setActive("#num2"));

// Helpers to edit value safely
const getVal = () => $(activeField).val();
const setVal = (v) => $(activeField).val(v).trigger("input");

const toggleSign = (v) => {
  if (!v) return "-";
  if (v === "-") return "";
  return v.startsWith("-") ? v.slice(1) : "-" + v;
};

const addDot = (v) => {
  if (!v) return "0.";
  if (v.includes(".")) return v;
  if (v === "-") return "-0.";
  return v + ".";
};

const backspace = (v) => v ? v.slice(0, -1) : v;

// Keypad click handling
$(".padBtn").on("click", function () {
  const key = $(this).data("key");
  if (!key) return;

  // Clear calc message when typing
  $("#calcErr").hide().text("");

  let v = getVal();

  if (key === "ac") {
    setVal("");
    $("#result").val("").prop("disabled", true);
    return;
  }
  if (key === "back") {
    setVal(backspace(v));
    $("#result").val("").prop("disabled", true);
    return;
  }
  if (key === "sign") {
    setVal(toggleSign(v));
    $("#result").val("").prop("disabled", true);
    return;
  }
  if (key === "dot") {
    setVal(addDot(v));
    $("#result").val("").prop("disabled", true);
    return;
  }

  // digits / 00
  setVal(v + String(key));
  $("#result").val("").prop("disabled", true);
});

  // Logout
  $("#logoutBtn").on("click", function () {
    clearSession();
    $("body").fadeOut(450, function () {
      window.location.href = "login.html";
    });
  });

  // Init
  $num1Err.hide();
  $num2Err.hide();
  $calcErr.hide();
});
