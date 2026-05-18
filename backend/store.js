const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, 'data.json');

function initData() {
  return {
    nextUserId: 1,
    nextVacationId: 1,
    users: [],
    vacation_requests: [],
  };
}

function readData() {
  if (!fs.existsSync(dataFile)) {
    saveData(initData());
  }

  try {
    const content = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(content || '{}');
  } catch (error) {
    const data = initData();
    saveData(data);
    return data;
  }
}

function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
}

async function getUserByEmail(email) {
  const data = readData();
  return data.users.find((user) => user.email === email) || null;
}

async function getUserById(id) {
  const data = readData();
  return data.users.find((user) => user.id === Number(id)) || null;
}

async function createUser({ name, email, password_hash, role, manager_id, vacation_balance }) {
  const data = readData();
  const user = {
    id: data.nextUserId++,
    name,
    email,
    password_hash,
    role,
    manager_id: manager_id || null,
    vacation_balance: vacation_balance ?? 30,
  };
  data.users.push(user);
  saveData(data);
  return user;
}

async function updateUserBalance(userId, delta) {
  const data = readData();
  const user = data.users.find((entry) => entry.id === Number(userId));
  if (!user) {
    return null;
  }
  user.vacation_balance = Math.max(0, (user.vacation_balance || 0) + Number(delta));
  saveData(data);
  return user;
}

async function getVacationRequestsForUser(userId) {
  const data = readData();
  return data.vacation_requests.filter((request) => request.user_id === Number(userId));
}

async function getAllVacationRequests() {
  const data = readData();
  return data.vacation_requests;
}

async function createVacationRequest({ user_id, start_date, end_date, total_days }) {
  const data = readData();
  const request = {
    id: data.nextVacationId++,
    user_id: Number(user_id),
    start_date,
    end_date,
    total_days: Number(total_days),
    status: 'pending',
    manager_comment: null,
    created_at: new Date().toISOString(),
  };
  data.vacation_requests.push(request);
  saveData(data);
  return request;
}

async function getVacationRequestById(id) {
  const data = readData();
  return data.vacation_requests.find((request) => request.id === Number(id)) || null;
}

async function updateVacationRequest(id, updates) {
  const data = readData();
  const request = data.vacation_requests.find((entry) => entry.id === Number(id));
  if (!request) {
    return null;
  }
  Object.assign(request, updates);
  saveData(data);
  return request;
}

module.exports = {
  getUserByEmail,
  getUserById,
  createUser,
  updateUserBalance,
  getVacationRequestsForUser,
  getAllVacationRequests,
  createVacationRequest,
  getVacationRequestById,
  updateVacationRequest,
};
