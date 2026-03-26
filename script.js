const USERS = [
  { email: 'student@example.com', password: 'student123', role: 'student', name: 'Student'     },
  { email: 'officer@example.com', password: 'officer123', role: 'officer', name: 'Officer' },
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
      loadOfficerPage(match);
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

/* ── LOAD ORGANIZER PAGE ── */
function loadOfficerPage(user) {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('organizerPage').style.display = 'flex';
  document.getElementById('organizerName').textContent = user.name;
  
  // Clear form fields
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  
  // Initialize dashboard
  showOrganizerSection('dashboard');
}

/* ── SHOW ORGANIZER SECTION ── */
function showOrganizerSection(section) {
  console.log('showOrganizerSection called with:', section);
  
  // Hide all sections with inline style
  const sectionIds = ['org-dashboard-section', 'org-events-section', 'org-registrations-section', 'org-profile-section', 'org-settings-section'];
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      console.log('Hiding:', id);
      el.style.display = 'none';
      el.classList.add('section-hidden');
    }
  });
  
  // Show selected section with inline style
  let sectionId = section === 'settings' ? 'org-settings-section' : 'org-' + section + '-section';
  const target = document.getElementById(sectionId);
  if (target) {
    console.log('Showing:', sectionId);
    target.style.display = 'block';
    target.classList.remove('section-hidden');
  }
  
  // Remove active class and update nav items
  const navItems = document.querySelectorAll('.org-nav-item');
  navItems.forEach(item => {
    item.style.background = 'transparent';
  });
  
  // Add active background to selected nav item
  const activeNav = document.getElementById('org-nav-' + section);
  if (activeNav) activeNav.style.background = 'rgba(255,255,255,0.15)';
  
  // Update title
  const titles = {
    'dashboard': 'Dashboard',
    'events': 'My Events',
    'registrations': 'Registrations',
    'profile': 'Organization Profile',
    'settings': 'Settings'
  };
  
  const titleEl = document.getElementById('org-section-title');
  if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
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
  console.log('showAdminSection called with:', section);
  
  // Hide all sections with inline style
  const sectionIds = ['dashboard-section', 'events-section', 'announcements-section', 'users-section', 'settings-section'];
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      console.log('Hiding:', id);
      el.style.display = 'none';
      el.classList.add('section-hidden');
    }
  });
  
  // Show selected section with inline style
  const sectionId = section + '-section';
  const target = document.getElementById(sectionId);
  if (target) {
    console.log('Showing:', sectionId);
    target.style.display = 'block';
    target.classList.remove('section-hidden');
  }
  
  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.admin-nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // Add active class to selected nav item
  const activeNav = document.getElementById('nav-' + section);
  if (activeNav) activeNav.classList.add('active');
  
  // Update title and date
  const titles = {
    'dashboard': 'Dashboard',
    'events': 'Event Management',
    'announcements': 'Announcements',
    'users': 'User Management',
    'settings': 'Settings'
  };
  
  const dates = {
    'dashboard': 'Thursday, March 14, 2026 • Welcome, Administrator',
    'events': 'Thursday, March 14, 2026 • Manage all campus events',
    'announcements': 'Thursday, March 14, 2026 • Manage announcements',
    'users': 'Thursday, March 14, 2026 • Manage users and permissions',
    'settings': 'Thursday, March 14, 2026 • System settings and configuration'
  };
  
  const titleEl = document.getElementById('admin-section-title');
  const dateEl = document.getElementById('admin-section-date');
  
  if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
  if (dateEl) dateEl.textContent = dates[section] || 'Thursday, March 14, 2026 • Welcome, Administrator';
}

/* ── LOGOUT HANDLER ── */
function logout() {
  currentUser = null;
  document.getElementById('loginPage').style.display = 'block';
  document.getElementById('studentPage').style.display = 'none';
  document.getElementById('organizerPage').style.display = 'none';
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
