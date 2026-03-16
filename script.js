const USERS = [
  { email: 'student@example.com', password: 'student123', role: 'student', name: 'Alex Santos'     },
  { email: 'officer@example.com', password: 'officer123', role: 'officer', name: 'Maria Dela Cruz' },
  { email: 'admin@example.com',   password: 'admin123',   role: 'admin',   name: 'Administrator'  },
];

let currentUser = null;

function switchToSignUp() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('signupForm').style.display = 'block';
  document.getElementById('welcomeLogin').style.display = 'none';
  document.getElementById('welcomeSignup').style.display = 'block';
  clearLoginErrors();
}

function switchToLogin() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('signupForm').style.display = 'none';
  document.getElementById('welcomeLogin').style.display = 'block';
  document.getElementById('welcomeSignup').style.display = 'none';
  clearSignupErrors();
}

/* ── TOGGLE PASSWORD ── */
function togglePass(inputId, iconId) {
  const inp  = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  const show = inp.type === 'password';
  inp.type       = show ? 'text' : 'password';
  icon.className = show ? 'bi bi-eye-slash' : 'bi bi-eye';
  icon.style.fontSize = '14px';
}

function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function showErr(inputId, errId, msg) {
  document.getElementById(inputId).classList.add('is-invalid');
  const el = document.getElementById(errId);
  el.textContent = msg;
  el.style.setProperty('display', 'block', 'important');
}

function clearErr(inputId, errId) {
  document.getElementById(inputId).classList.remove('is-invalid');
  const el = document.getElementById(errId);
  el.textContent = '';
  el.style.setProperty('display', 'none', 'important');
}

function clearLoginErrors() {
  clearErr('login-email',    'login-email-error');
  clearErr('login-password', 'login-pass-error');
}

function clearSignupErrors() {
  clearErr('reg-name',     'reg-name-error');
  clearErr('reg-email',    'reg-email-error');
  clearErr('reg-password', 'reg-pass-error');
}

/* ── SIGN UP HANDLER ─── */
function handleSignUp() {
  clearSignupErrors();

  const name  = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-password').value;
  let valid = true;

  if (!name)                { showErr('reg-name',     'reg-name-error',  'Full name is required.');                    valid = false; }
  if (!isValidEmail(email)) { showErr('reg-email',    'reg-email-error', 'Enter a valid email address.');              valid = false; }
  if (pass.length < 6)      { showErr('reg-password', 'reg-pass-error',  'Password must be at least 6 characters.');  valid = false; }
  if (!valid) return;

  setLoading('signupBtn', 'signup-spinner', 'signup-btn-text', 'Creating account...');
  setTimeout(() => {
    resetLoading('signupBtn', 'signup-spinner', 'signup-btn-text', 'Sign Up');
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-password').value = '';
    showToast('Account created! Please log in.');
    switchToLogin();
  }, 400);
}

/* ── LOGIN HANDLER ── */
function handleLogin() {
  clearLoginErrors();
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value;
  const role  = document.getElementById('login-role').value;
  let valid = true;

  if (!isValidEmail(email)) { showErr('login-email',    'login-email-error', 'Enter a valid email address.');           valid = false; }
  if (!pass)                { showErr('login-password', 'login-pass-error',  'Password cannot be empty.');              valid = false; }
  if (!valid) return;

  const match = USERS.find(u => u.email === email && u.password === pass && u.role === role);
  if (!match) {
    showErr('login-email',    'login-email-error', 'Invalid email, password, or role.');
    showErr('login-password', 'login-pass-error',  'Please check your credentials.');
    return;
  }

  setLoading('loginBtn', 'login-spinner', 'login-btn-text', 'Logging in...');
  setTimeout(() => {
    resetLoading('loginBtn', 'login-spinner', 'login-btn-text', 'Log In');
    currentUser = match;
    showToast('Welcome back, ' + match.name + '!');
    
    // Redirect based on role
    if (match.role === 'student') {
      loadStudentPage(match);
    } else if (match.role === 'officer') {
      // Officer page (to be implemented)
      alert('Officer page coming soon!');
    } else if (match.role === 'admin') {
      loadAdminPage(match);
    }
  }, 400);
}

/* ── LOAD STUDENT PAGE ── */
function loadStudentPage(user) {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('studentPage').style.display = 'block';
  document.getElementById('studentName').textContent = user.name;
  
  // Clear form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
}

/* ── LOAD ADMIN PAGE ── */
function loadAdminPage(user) {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminPage').style.display = 'flex';
  document.getElementById('adminName').textContent = user.name;
  
  // Clear form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  
  // Initialize dashboard
  showAdminSection('dashboard');
}

/* ── SHOW ADMIN SECTION ── */
function showAdminSection(section) {
  // Hide all sections
  document.getElementById('dashboard-section').style.display = 'none';
  document.getElementById('events-section').style.display = 'none';
  document.getElementById('announcements-section').style.display = 'none';
  document.getElementById('users-section').style.display = 'none';
  document.getElementById('settings-section').style.display = 'none';
  
  // Remove active class from all nav items
  document.querySelectorAll('.admin-nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Show selected section and mark nav item as active
  switch(section) {
    case 'dashboard':
      document.getElementById('dashboard-section').style.display = 'block';
      document.getElementById('nav-dashboard').classList.add('active');
      document.getElementById('admin-section-title').textContent = 'Dashboard';
      document.getElementById('admin-section-date').textContent = 'Thursday, March 14, 2026 • Welcome, Administrator';
      break;
    case 'events':
      document.getElementById('events-section').style.display = 'block';
      document.getElementById('nav-events').classList.add('active');
      document.getElementById('admin-section-title').textContent = 'Event Management';
      document.getElementById('admin-section-date').textContent = 'Thursday, March 14, 2026 • Manage all campus events';
      break;
    case 'announcements':
      document.getElementById('announcements-section').style.display = 'block';
      document.getElementById('nav-announcements').classList.add('active');
      document.getElementById('admin-section-title').textContent = 'Announcements';
      document.getElementById('admin-section-date').textContent = 'Thursday, March 14, 2026 • Manage announcements';
      break;
    case 'users':
      document.getElementById('users-section').style.display = 'block';
      document.getElementById('nav-users').classList.add('active');
      document.getElementById('admin-section-title').textContent = 'User Management';
      document.getElementById('admin-section-date').textContent = 'Thursday, March 14, 2026 • Manage users and permissions';
      break;
    case 'settings':
      document.getElementById('settings-section').style.display = 'block';
      document.getElementById('nav-settings').classList.add('active');
      document.getElementById('admin-section-title').textContent = 'Settings';
      document.getElementById('admin-section-date').textContent = 'Thursday, March 14, 2026 • System settings and configuration';
      break;
  }
}

/* ── LOGOUT HANDLER ── */
function logout() {
  currentUser = null;
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('studentPage').style.display = 'none';
  document.getElementById('adminPage').style.display = 'none';
  switchToLogin();
  clearLoginErrors();
  clearSignupErrors();
  showToast('You have been logged out.');
}

/* ── LOADING STATE ── */
function setLoading(btnId, spinnerId, textId, msg) {
  document.getElementById(btnId).disabled = true;
  document.getElementById(spinnerId).style.display = 'inline-block';
  document.getElementById(textId).textContent = msg;
}

function resetLoading(btnId, spinnerId, textId, msg) {
  document.getElementById(btnId).disabled = false;
  document.getElementById(spinnerId).style.display = 'none';
  document.getElementById(textId).textContent = msg;
}

/* ── EVENT DETAILS MODAL ── */
let currentEvent = null;

function viewEventDetails(eventData) {
  currentEvent = eventData;
  
  // Populate modal with event data
  document.getElementById('modalEventTitle').textContent = eventData.title;
  document.getElementById('modalEventDate').textContent = eventData.date;
  document.getElementById('modalEventTime').textContent = eventData.time;
  document.getElementById('modalEventLocation').textContent = eventData.location;
  document.getElementById('modalEventAttendees').textContent = eventData.attendees + ' people';
  document.getElementById('modalEventDescription').textContent = eventData.description;
  
  // Update category badge
  const categoryBadge = document.getElementById('modalEventCategory');
  categoryBadge.textContent = eventData.category;
  
  // Map category colors
  const categoryColors = {
    'Academic': { bg: '#E8F4F8', color: '#4A90E2' },
    'Social': { bg: '#F0E8F8', color: '#9C5FCC' },
    'Sports': { bg: '#FEE8E8', color: '#FF6B35' }
  };
  
  const colors = categoryColors[eventData.category] || categoryColors['Social'];
  categoryBadge.style.background = colors.bg;
  categoryBadge.style.color = colors.color;
  
  // Populate highlights list
  const detailsList = document.getElementById('modalEventDetails');
  detailsList.innerHTML = '';
  if (eventData.details) {
    eventData.details.forEach(detail => {
      const li = document.createElement('li');
      li.textContent = detail;
      detailsList.appendChild(li);
    });
  }
  
  // Update button state
  const registerBtn = document.getElementById('modalRegisterBtn');
  if (eventData.registered) {
    registerBtn.textContent = '✓ Already Registered';
    registerBtn.disabled = true;
    registerBtn.className = 'btn btn-lg btn-success w-100';
  } else {
    registerBtn.textContent = 'Register Now';
    registerBtn.disabled = false;
    registerBtn.className = 'btn btn-lg btn-danger w-100';
  }
  
  // Show modal
  const modal = document.getElementById('eventDetailsModal');
  modal.classList.add('show');
}

function closeEventDetails() {
  const modal = document.getElementById('eventDetailsModal');
  modal.classList.remove('show');
  currentEvent = null;
}

function registerForEvent() {
  if (!currentEvent) return;
  
  const registerBtn = document.getElementById('modalRegisterBtn');
  registerBtn.disabled = true;
  registerBtn.textContent = 'Registering...';
  
  // Simulate registration
  setTimeout(() => {
    registerBtn.textContent = '✓ Successfully Registered!';
    registerBtn.className = 'btn btn-lg btn-success w-100';
    currentEvent.registered = true;
    showToast(`Successfully registered for ${currentEvent.title}!`);
    
    // Close modal after 1.5 seconds
    setTimeout(() => {
      closeEventDetails();
    }, 1500);
  }, 1000);
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('eventDetailsModal');
  if (modal) {
    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeEventDetails();
      }
    });
  }
});

/* ── TOAST ──*/
function showToast(msg) {
  document.getElementById('toast-msg').textContent = msg;
  new bootstrap.Toast(document.getElementById('appToast'), { delay: 3000 }).show();
}

/* ── ENTER KEY ── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const loginForm = document.getElementById('loginForm');
  if (loginForm.style.display !== 'none') handleLogin();
  else handleSignUp();
});
