const USER_KEY = 'auraUser';
const SESSION_KEY = 'auraSession';
const PLAN_KEY = 'auraSelectedPlan';

function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function getSessionUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

function getSelectedPlan() {
  const raw = localStorage.getItem(PLAN_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setMessage(elementId, message, type = 'error') {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `form-message ${type}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function isStrongPassword(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
}

function requireAuth() {
  const session = getSessionUser();
  if (!session) {
    window.location.href = 'login.html';
  }
}

function preventAuthPagesWhenLoggedIn() {
  const session = getSessionUser();
  const fileName = window.location.pathname.split('/').pop();
  if (session && (fileName === 'login.html' || fileName === 'register.html' || fileName === '')) {
    window.location.href = 'index.html';
  }
}

function handleRegister() {
  const registerForm = document.getElementById('registerForm');
  if (!registerForm) return;

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const existingUser = getStoredUser();

    if (!name || !email || !password || !confirmPassword) {
      setMessage('registerMessage', 'Please fill in all fields.');
      return;
    }
    if (name.length < 3 || !/^[A-Za-z ]+$/.test(name)) {
      setMessage('registerMessage', 'Enter a valid full name using at least 3 letters.');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('registerMessage', 'Please enter a valid email address.');
      return;
    }
    if (existingUser && existingUser.email === email) {
      setMessage('registerMessage', 'An account with this email already exists. Please log in.');
      return;
    }
    if (!isStrongPassword(password)) {
      setMessage('registerMessage', 'Password must be 8+ characters and include a letter, a number, and a special character.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('registerMessage', 'Passwords do not match.');
      return;
    }

    const user = { name, email, password };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
    setMessage('registerMessage', 'Account created successfully! Redirecting to home...', 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 900);
  });
}

function handleLogin() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const storedUser = getStoredUser();

    if (!email || !password) {
      setMessage('loginMessage', 'Please enter email and password.');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('loginMessage', 'Please enter a valid email format.');
      return;
    }
    if (password.length < 8) {
      setMessage('loginMessage', 'Password must be at least 8 characters long.');
      return;
    }
    if (!storedUser) {
      setMessage('loginMessage', 'No account found. Please create an account first.');
      return;
    }
    if (storedUser.email !== email || storedUser.password !== password) {
      setMessage('loginMessage', 'Invalid email or password.');
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: storedUser.name, email: storedUser.email }));
    setMessage('loginMessage', 'Login successful! Redirecting...', 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 700);
  });
}

function attachLogout() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (!logoutBtn) return;

  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  });
}

function showUserName() {
  const nameHolder = document.getElementById('userWelcome');
  const session = getSessionUser();
  if (nameHolder && session) {
    nameHolder.textContent = `Hi, ${session.name}`;
  }
}

function attachPlanSelection() {
  const buttons = document.querySelectorAll('.choose-plan');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      const selectedPlan = {
        name: button.dataset.plan,
        price: button.dataset.price
      };
      localStorage.setItem(PLAN_KEY, JSON.stringify(selectedPlan));
    });
  });
}

function populateBillingPage() {
  const planName = document.getElementById('selectedPlanName');
  const planPrice = document.getElementById('selectedPlanPrice');
  const billingName = document.getElementById('billingName');
  const billingEmail = document.getElementById('billingEmail');
  const session = getSessionUser();
  const plan = getSelectedPlan();

  if (billingName && session) billingName.value = session.name || '';
  if (billingEmail && session) billingEmail.value = session.email || '';

  if (planName && planPrice && plan) {
    planName.textContent = `${plan.name} Plan`;
    planPrice.textContent = plan.price;
  }
}

function formatBillingFields() {
  const cardNumber = document.getElementById('cardNumber');
  const expiryDate = document.getElementById('expiryDate');
  const cvv = document.getElementById('cvv');
  const zipCode = document.getElementById('zipCode');

  if (cardNumber) {
    cardNumber.addEventListener('input', function () {
      const digits = cardNumber.value.replace(/\D/g, '').slice(0, 16);
      cardNumber.value = digits.replace(/(.{4})/g, '$1 ').trim();
    });
  }
  if (expiryDate) {
    expiryDate.addEventListener('input', function () {
      const digits = expiryDate.value.replace(/\D/g, '').slice(0, 4);
      expiryDate.value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    });
  }
  if (cvv) {
    cvv.addEventListener('input', function () {
      cvv.value = cvv.value.replace(/\D/g, '').slice(0, 4);
    });
  }
  if (zipCode) {
    zipCode.addEventListener('input', function () {
      zipCode.value = zipCode.value.replace(/[^\d-]/g, '').slice(0, 10);
    });
  }
}

function handleBilling() {
  const billingForm = document.getElementById('billingForm');
  if (!billingForm) return;

  billingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const plan = getSelectedPlan();
    const name = document.getElementById('billingName').value.trim();
    const email = document.getElementById('billingEmail').value.trim().toLowerCase();
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const zipCode = document.getElementById('zipCode').value.trim();
    const address = document.getElementById('billingAddress').value.trim();

    if (!plan) {
      setMessage('billingMessage', 'Please choose a membership plan first.');
      return;
    }
    if (name.length < 3 || !/^[A-Za-z ]+$/.test(name)) {
      setMessage('billingMessage', 'Enter a valid cardholder name.');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('billingMessage', 'Enter a valid billing email.');
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setMessage('billingMessage', 'Card number must contain 16 digits.');
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
      setMessage('billingMessage', 'Enter expiry in MM/YY format.');
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setMessage('billingMessage', 'CVV must be 3 or 4 digits.');
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
      setMessage('billingMessage', 'Enter a valid ZIP code.');
      return;
    }
    if (address.length < 8) {
      setMessage('billingMessage', 'Please enter a complete billing address.');
      return;
    }

    localStorage.setItem('auraLastPayment', JSON.stringify({
      plan: plan.name,
      price: plan.price,
      billingName: name,
      billingEmail: email,
      paidAt: new Date().toLocaleString()
    }));
    setMessage('billingMessage', `Payment successful! ${plan.name} plan activated. Redirecting to home...`, 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1100);
  });
}

(function init() {
  const fileName = window.location.pathname.split('/').pop();
  if (fileName === 'login.html' || fileName === 'register.html' || fileName === '') {
    preventAuthPagesWhenLoggedIn();
  } else {
    requireAuth();
  }

  handleRegister();
  handleLogin();
  attachLogout();
  showUserName();
  attachPlanSelection();
  populateBillingPage();
  formatBillingFields();
  handleBilling();
})();
