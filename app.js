// ultra-simple auth (client-side only)
const USERS_KEY = 'robotTest_users';
const LOGGED_KEY = 'robotTest_logged';

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
}
function saveUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}
function setLogged(username) {
  sessionStorage.setItem(LOGGED_KEY, username);
}
function getLogged() {
  return sessionStorage.getItem(LOGGED_KEY);
}
function clearLogged() {
  sessionStorage.removeItem(LOGGED_KEY);
}

// register
function register(u, p) {
  const users = getUsers();
  if (users.find(x => x.username === u)) return {ok: false, msg: 'User exists'};
  users.push({username: u, password: p});
  saveUsers(users);
  return {ok: true};
}
// login
function login(u, p) {
  const users = getUsers();
  const match = users.find(x => x.username === u && x.password === p);
  if (!match) return {ok: false, msg: 'Bad credentials'};
  setLogged(u);
  return {ok: true};
}
// protect a page
function protect() {
  if (!getLogged()) {
    location.href = 'login.html?redirect=' + encodeURIComponent(location.pathname);
  }
}
// logout
function logout() {
  clearLogged();
  location.href = 'index.html';
}
