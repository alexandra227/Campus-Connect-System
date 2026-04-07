const USERS = [
  { email: 'student@example.com', password: 'student123', role: 'student', name: 'Student', department: 'Computer Science' },
  { email: 'officer@example.com', password: 'officer123', role: 'officer', name: 'Officer' },
  { email: 'admin@example.com',   password: 'admin123',   role: 'admin',   name: 'Administrator'  },
];

// Events data for admin panel
const EVENTS = [
  { id: 1, name: 'Research Summit 2026', organizer: 'CSS Society', organizerId: 1, category: 'Academic' },
  { id: 2, name: 'Campus Music Fest', organizer: 'Music Circle', organizerId: 2, category: 'Social' },
  { id: 3, name: 'Hackathon 2026', organizer: 'Unassigned', organizerId: null, category: 'Org Event' },
  { id: 4, name: 'Intramurals Opening', organizer: 'Sports Club', organizerId: 3, category: 'Sports' },
  { id: 5, name: 'Scholarship Fair', organizer: 'Unassigned', organizerId: null, category: 'Academic' },
];

// Organizers data
const ORGANIZERS = [
  { id: 1, name: 'CSS Society' },
  { id: 2, name: 'Music Circle' },
  { id: 3, name: 'Sports Club' },
  { id: 4, name: 'Student Government' },
  { id: 5, name: 'Debate Club' },
  { id: 6, name: 'Drama Club' },
  { id: 7, name: 'Tech Innovation Club' },
];

// Departments data
const DEPARTMENTS = [
  { id: 1, name: 'Computer Science', head: 'Dr. John Smith', members: 45, status: 'active' },
  { id: 2, name: 'Business Administration', head: 'Dr. Sarah Johnson', members: 32, status: 'active' },
  { id: 3, name: 'Engineering', head: 'Dr. Michael Brown', members: 58, status: 'active' },
  { id: 4, name: 'Arts & Humanities', head: 'Dr. Emily Davis', members: 28, status: 'active' },
  { id: 5, name: 'Medicine', head: 'Dr. Robert Wilson', members: 35, status: 'active' },
  { id: 6, name: 'Law', head: 'Dr. Patricia Martinez', members: 22, status: 'active' },
];

// Announcements data
const ANNOUNCEMENTS = [
  { id: 1, title: 'Campus Closure Notice', content: 'The campus will be closed on March 25, 2026 due to public holiday.', date: '2026-03-20', author: 'Administrator', priority: 'high', status: 'published' },
  { id: 2, title: 'New Library Hours', content: 'Starting April 1st, the library will open from 8 AM to 10 PM.', date: '2026-03-18', author: 'Administrator', priority: 'normal', status: 'published' },
  { id: 3, title: 'Scholarship Applications Open', content: 'Annual scholarship applications are now open. Deadline is April 30, 2026.', date: '2026-03-15', author: 'Administrator', priority: 'high', status: 'published' },
  { id: 4, title: 'Maintenance Notice', content: 'Server maintenance is scheduled for April 10, 2026 from 2 AM to 6 AM.', date: '2026-03-12', author: 'Administrator', priority: 'normal', status: 'draft' },
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
  let valid = true;

  if (!isValidEmail(email)) { showErr('login-email',    'login-email-error', 'Enter a valid email address.');           valid = false; }
  if (!pass)                { showErr('login-password', 'login-pass-error',  'Password cannot be empty.');              valid = false; }
  if (!valid) return;

  const match = USERS.find(u => u.email === email && u.password === pass);
  if (!match) {
    showErr('login-email',    'login-email-error', 'Invalid email or password.');
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
  
  // Filter events by student's department
  filterEventsByDepartment(user.department);
  
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
  
  // Initialize tables
  initializeEventsTable();
  initializeAccountsTable();
  initializeDepartmentsTable();
  initializeAnnouncementsTable();
}

/* ── SHOW ADMIN SECTION ── */
function showAdminSection(section) {
  console.log('showAdminSection called with:', section);
  
  // Hide all sections with inline style
  const sectionIds = ['dashboard-section', 'events-section', 'announcements-section', 'users-section', 'departments-section', 'settings-section'];
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
    'departments': 'Department Management',
    'settings': 'Settings'
  };
  
  const dates = {
    'dashboard': 'Thursday, March 14, 2026 • Welcome, Administrator',
    'events': 'Thursday, March 14, 2026 • Manage all campus events',
    'announcements': 'Thursday, March 14, 2026 • Manage announcements',
    'users': 'Thursday, March 14, 2026 • Manage users and permissions',
    'departments': 'Thursday, March 14, 2026 • Manage departments and organize accounts',
    'settings': 'Thursday, March 14, 2026 • System settings and configuration'
  };
  
  const titleEl = document.getElementById('admin-section-title');
  const dateEl = document.getElementById('admin-section-date');
  
  if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
  if (dateEl) dateEl.textContent = dates[section] || 'Thursday, March 14, 2026 • Welcome, Administrator';
  
  // Initialize section-specific content
  if (section === 'events') {
    initializeEventsTable();
  } else if (section === 'departments') {
    initializeDepartmentsTable();
  } else if (section === 'users') {
    initializeAccountsTable();
  } else if (section === 'announcements') {
    initializeAnnouncementsTable();
  }
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

/* ── INITIALIZE EVENTS TABLE ── */
function initializeEventsTable() {
  const tbody = document.getElementById('eventsTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  EVENTS.forEach(event => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';
    
    const organizerName = event.organizerId ? 
      ORGANIZERS.find(o => o.id === event.organizerId)?.name || 'Unknown' : 
      'Unassigned';
    
    const organizerColor = event.organizerId ? '#333' : '#999';
    
    row.innerHTML = `
      <td style="padding:12px; color:#1a1a1a; font-weight:500;">${event.name}</td>
      <td style="padding:12px; color:${organizerColor};">${organizerName}</td>
      <td style="padding:12px;">
        <span style="background:#E8F4F8; color:#4A90E2; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:600;">${event.category}</span>
      </td>
      <td style="padding:12px; text-align:center;">
        <button onclick="openAssignOrganizerModal(${event.id})" style="background:#2196F3; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer;">
          <i class="bi bi-pencil" style="margin-right:4px;"></i>Assign
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/* ── TOGGLE ASSIGN ORGANIZER MODAL ── */
function toggleAssignOrganizerModal() {
  const modal = document.getElementById('assignOrganizerModal');
  if (!modal) return;
  
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'flex';
    populateEventDropdown();
    populateOrganizerDropdown();
  } else {
    modal.style.display = 'none';
    document.getElementById('assignEventSelect').value = '';
    document.getElementById('assignOrganizerSelect').value = '';
    document.getElementById('assignNotes').value = '';
  }
}

/* ── OPEN ASSIGN ORGANIZER MODAL WITH EVENT PRE-SELECTED ── */
function openAssignOrganizerModal(eventId) {
  const modal = document.getElementById('assignOrganizerModal');
  if (!modal) return;
  
  modal.style.display = 'flex';
  document.getElementById('assignEventSelect').value = eventId;
  document.getElementById('assignOrganizerSelect').value = '';
  document.getElementById('assignNotes').value = '';
  populateEventDropdown();
  populateOrganizerDropdown();
}

/* ── POPULATE EVENT DROPDOWN ── */
function populateEventDropdown() {
  const select = document.getElementById('assignEventSelect');
  if (!select) return;
  
  const currentValue = select.value;
  select.innerHTML = '<option value="">-- Choose an event --</option>';
  
  EVENTS.forEach(event => {
    const option = document.createElement('option');
    option.value = event.id;
    option.textContent = event.name;
    select.appendChild(option);
  });
  
  if (currentValue) select.value = currentValue;
}

/* ── POPULATE ORGANIZER DROPDOWN ── */
function populateOrganizerDropdown() {
  const select = document.getElementById('assignOrganizerSelect');
  if (!select) return;
  
  select.innerHTML = '<option value="">-- Choose an organizer --</option>';
  
  ORGANIZERS.forEach(organizer => {
    const option = document.createElement('option');
    option.value = organizer.id;
    option.textContent = organizer.name;
    select.appendChild(option);
  });
}

/* ── CONFIRM ASSIGN ORGANIZER ── */
function confirmAssignOrganizer() {
  const eventId = parseInt(document.getElementById('assignEventSelect').value);
  const organizerId = parseInt(document.getElementById('assignOrganizerSelect').value);
  const notes = document.getElementById('assignNotes').value;
  
  if (!eventId || !organizerId) {
    alert('Please select both an event and an organizer.');
    return;
  }
  
  // Find the event and update it
  const event = EVENTS.find(e => e.id === eventId);
  const organizer = ORGANIZERS.find(o => o.id === organizerId);
  
  if (event && organizer) {
    event.organizerId = organizerId;
    event.organizer = organizer.name;
    
    // Show success message
    showToast(`${organizer.name} has been assigned to ${event.name}`);
    
    // Close modal
    toggleAssignOrganizerModal();
    
    // Refresh the events table
    initializeEventsTable();
  }
}

/* ──── ANNOUNCEMENTS MANAGEMENT ──── */

/* ── TOGGLE ANNOUNCEMENT MODAL ── */
function toggleAnnouncementModal(announcementId = null) {
  const modal = document.getElementById('announcementModal');
  if (!modal) return;
  
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'flex';
    if (announcementId) {
      loadAnnouncementToEdit(announcementId);
    } else {
      document.getElementById('announcementTitle').value = '';
      document.getElementById('announcementContent').value = '';
      document.getElementById('announcementModalTitle').textContent = 'Post New Announcement';
      document.getElementById('announcementId').value = '';
    }
  } else {
    modal.style.display = 'none';
  }
}

/* ── LOAD ANNOUNCEMENT TO EDIT ── */
function loadAnnouncementToEdit(announcementId) {
  const announcement = ANNOUNCEMENTS.find(a => a.id === announcementId);
  if (announcement) {
    document.getElementById('announcementTitle').value = announcement.title;
    document.getElementById('announcementContent').value = announcement.content;
    document.getElementById('announcementId').value = announcementId;
    document.getElementById('announcementModalTitle').textContent = 'Edit Announcement';
  }
}

/* ── CONFIRM CREATE/EDIT ANNOUNCEMENT ── */
function confirmAnnouncement() {
  const announcementId = document.getElementById('announcementId').value;
  const title = document.getElementById('announcementTitle').value.trim();
  const content = document.getElementById('announcementContent').value.trim();
  
  if (!title || !content) {
    alert('Please fill in title and content.');
    return;
  }
  
  if (announcementId) {
    // Edit existing announcement
    const announcement = ANNOUNCEMENTS.find(a => a.id === parseInt(announcementId));
    if (announcement) {
      announcement.title = title;
      announcement.content = content;
      showToast('Announcement updated successfully');
    }
  } else {
    // Create new announcement
    const newAnnouncement = {
      id: Math.max(...ANNOUNCEMENTS.map(a => a.id), 0) + 1,
      title: title,
      content: content,
      date: new Date().toISOString().split('T')[0],
      author: currentUser ? currentUser.name : 'Administrator',
      priority: 'normal',
      status: 'published'
    };
    ANNOUNCEMENTS.push(newAnnouncement);
    showToast('Announcement posted successfully');
  }
  
  toggleAnnouncementModal();
  initializeAnnouncementsTable();
}

/* ── DELETE ANNOUNCEMENT ── */
function deleteAnnouncement(announcementId) {
  if (confirm('Are you sure you want to delete this announcement?')) {
    const index = ANNOUNCEMENTS.findIndex(a => a.id === announcementId);
    if (index > -1) {
      ANNOUNCEMENTS.splice(index, 1);
      showToast('Announcement deleted successfully');
      initializeAnnouncementsTable();
    }
  }
}

/* ── INITIALIZE ANNOUNCEMENTS TABLE ── */
function initializeAnnouncementsTable() {
  const tbody = document.getElementById('announcementsTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  ANNOUNCEMENTS.forEach(announcement => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';
    
    const contentPreview = announcement.content.substring(0, 50) + (announcement.content.length > 50 ? '...' : '');
    
    row.innerHTML = `
      <td style="padding:12px; color:#1a1a1a; font-weight:600;">${announcement.title}</td>
      <td style="padding:12px; color:#666; font-size:12px;">${contentPreview}</td>
      <td style="padding:12px; text-align:center; color:#666; font-size:12px;">${announcement.date}</td>
      <td style="padding:12px; text-align:center;">
        <button onclick=\"toggleAnnouncementModal(${announcement.id})\" style=\"background:#2196F3; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer; margin-right:4px;\">Edit</button>
        <button onclick=\"deleteAnnouncement(${announcement.id})\" style=\"background:#f44336; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer;\">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/* ── TOGGLE CREATE ACCOUNT MODAL ── */
function toggleCreateAccountModal() {
  const modal = document.getElementById('createAccountModal');
  if (!modal) return;
  
  if (modal.style.display === 'none' || modal.style.display === '') {
    modal.style.display = 'flex';
    populateDepartmentDropdown();
  } else {
    modal.style.display = 'none';
    document.getElementById('createName').value = '';
    document.getElementById('createEmail').value = '';
    document.getElementById('createPassword').value = '';
    document.getElementById('createRole').value = 'student';
    document.getElementById('createDepartment').value = '';
  }
}

/* ── POPULATE DEPARTMENT DROPDOWN ── */
function populateDepartmentDropdown() {
  const select = document.getElementById('createDepartment');
  if (!select) return;
  
  const currentValue = select.value;
  select.innerHTML = '<option value="">-- Select Department --</option>';
  
  DEPARTMENTS.forEach(dept => {
    const option = document.createElement('option');
    option.value = dept.id;
    option.textContent = dept.name;
    select.appendChild(option);
  });
  
  if (currentValue) select.value = currentValue;
}

/* ── CONFIRM CREATE ACCOUNT ── */
function confirmCreateAccount() {
  const name = document.getElementById('createName').value.trim();
  const email = document.getElementById('createEmail').value.trim();
  const password = document.getElementById('createPassword').value;
  const role = document.getElementById('createRole').value;
  const departmentId = parseInt(document.getElementById('createDepartment').value);
  
  if (!name || !email || !password || !role) {
    alert('Please fill in all required fields.');
    return;
  }
  
  const department = DEPARTMENTS.find(d => d.id === departmentId);
  
  if (!department) {
    alert('Please select a department.');
    return;
  }
  
  // Check if email already exists
  if (USERS.find(u => u.email === email)) {
    alert('Email already exists.');
    return;
  }
  
  // Create new user object
  const newUser = {
    email: email,
    password: password,
    role: role,
    name: name,
    department: department.name,
    departmentId: departmentId,
    createdAt: new Date().toLocaleDateString()
  };
  
  // Add to USERS array
  USERS.push(newUser);
  
  // Update department members count
  department.members += 1;
  
  // Show success message
  showToast(`Account created for ${name} in ${department.name}`);
  
  // Close modal
  toggleCreateAccountModal();
  
  // Refresh the table if it exists
  if (document.getElementById('accountsTableBody')) {
    initializeAccountsTable();
  }
}

/* ── INITIALIZE ACCOUNTS TABLE ── */
function initializeAccountsTable() {
  const tbody = document.getElementById('accountsTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  // Show only recently created accounts or all accounts up to 10
  const recentAccounts = USERS.slice(-10);
  
  recentAccounts.forEach(user => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';
    
    const roleColor = {
      'student': '#4A90E2',
      'officer': '#FF9500',
      'admin': '#C0272D'
    }[user.role] || '#999';
    
    const departmentDisplay = user.department || 'N/A';
    
    row.innerHTML = `
      <td style="padding:12px; color:#1a1a1a; font-weight:500;">${user.name}</td>
      <td style="padding:12px; color:#666; font-size:12px;">${user.email}</td>
      <td style="padding:12px;">${departmentDisplay}</td>
      <td style="padding:12px;">
        <span style="background:${roleColor}33; color:${roleColor}; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:600; text-transform:capitalize;">${user.role}</span>
      </td>
      <td style="padding:12px; text-align:center; font-size:11px; color:#999;">${user.createdAt || 'Today'}</td>
    `;
    tbody.appendChild(row);
  });
}

/* ── INITIALIZE DEPARTMENTS TABLE ── */
function initializeDepartmentsTable() {
  const tbody = document.getElementById('departmentsTableBody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  DEPARTMENTS.forEach(dept => {
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid #e5e7eb';
    
    row.innerHTML = `
      <td style="padding:12px; color:#1a1a1a; font-weight:600;">${dept.name}</td>
      <td style="padding:12px;">${dept.head}</td>
      <td style="padding:12px; text-align:center;">
        <span style="background:#E8F4F8; color:#4A90E2; padding:6px 12px; border-radius:4px; font-size:12px; font-weight:600;">${dept.members} members</span>
      </td>
      <td style="padding:12px; text-align:center;">
        <span style="background:#E8F8E8; color:#1D9E75; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:600; text-transform:capitalize;">${dept.status}</span>
      </td>
      <td style="padding:12px; text-align:center;">
        <button onclick="editDepartment(${dept.id})" style="background:#2196F3; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer; margin-right:4px;">Edit</button>
        <button onclick="viewDepartmentDetails(${dept.id})" style="background:#4CAF50; color:#fff; border:none; padding:6px 12px; border-radius:4px; font-size:11px; font-weight:600; cursor:pointer;">View</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/* ── EDIT DEPARTMENT (placeholder) ── */
function editDepartment(deptId) {
  const dept = DEPARTMENTS.find(d => d.id === deptId);
  if (dept) {
    showToast(`Edit mode for ${dept.name} - Feature coming soon`);
  }
}

/* ── VIEW DEPARTMENT DETAILS (placeholder) ── */
function viewDepartmentDetails(deptId) {
  const dept = DEPARTMENTS.find(d => d.id === deptId);
  if (dept) {
    showToast(`Viewing ${dept.name} - ${dept.members} members, Head: ${dept.head}`);
  }
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

/* ── FILTER UPDATES ── */
function filterUpdates(category) {
  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.update-tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));
  
  // Add active class to clicked tab
  event.target.classList.add('active');
  
  // Filter events based on category and department
  const events = document.querySelectorAll('.event-item');
  events.forEach(eventItem => {
    const eventDept = eventItem.getAttribute('data-department');
    const eventCategory = eventItem.getAttribute('data-category');
    
    // Show event if department matches (for student filtering)
    // If no department set, show it (for admin view)
    const deptMatch = !eventDept || eventDept === currentUser?.department || currentUser?.role !== 'student';
    
    if (!deptMatch) {
      eventItem.style.display = 'none';
      return;
    }
    
    if (category === 'all') {
      eventItem.style.display = 'block';
    } else {
      // Map tab categories to event categories
      let matchesFilter = false;
      if (category === 'academic' && eventCategory === 'academic') {
        matchesFilter = true;
      } else if (category === 'non-academic' && eventCategory === 'non-academic') {
        matchesFilter = true;
      } else if ((category === 'organizations' || category === 'council-events') && (eventCategory === 'organizations' || eventCategory === 'council-events')) {
        matchesFilter = true;
      }
      
      eventItem.style.display = matchesFilter ? 'block' : 'none';
    }
  });
}

/* ── FILTER EVENTS BY DEPARTMENT ── */
function filterEventsByDepartment(department) {
  const events = document.querySelectorAll('.event-item');
  events.forEach(eventItem => {
    const eventDept = eventItem.getAttribute('data-department');
    // Show events only for the student's department
    eventItem.style.display = eventDept === department ? 'block' : 'none';
  });
}

/* ── ENTER KEY ── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const loginForm = document.getElementById('loginForm');
  if (loginForm.style.display !== 'none') handleLogin();
  else handleSignUp();
});
