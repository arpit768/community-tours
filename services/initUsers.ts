// Initialize default users for testing

import { UserRole } from '../types';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export function initializeDefaultUsers() {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

  if (existingUsers.length > 0) {
    return;
  }

  const defaultUsers: StoredUser[] = [
    {
      id: 'admin-1',
      name: 'Krishna Admin',
      email: 'admin@communitytours.com',
      role: UserRole.ADMIN,
      password: 'admin123',
    },
    {
      id: 'staff-1',
      name: 'Hari Thapa',
      email: 'staff@communitytours.com',
      role: UserRole.STAFF,
      password: 'staff123',
    },
    {
      id: 'customer-1',
      name: 'Ram Kumar',
      email: 'customer@communitytours.com',
      role: UserRole.CUSTOMER,
      password: 'customer123',
    },
  ];

  localStorage.setItem('users', JSON.stringify(defaultUsers));
}

export function ensureAdminStaffAccounts() {
  const existingUsers: StoredUser[] = JSON.parse(localStorage.getItem('users') || '[]');

  const mockAccounts: StoredUser[] = [
    {
      id: 'admin-1',
      name: 'Krishna Admin',
      email: 'admin@communitytours.com',
      role: UserRole.ADMIN,
      password: 'admin123',
    },
    {
      id: 'staff-1',
      name: 'Hari Thapa',
      email: 'staff@communitytours.com',
      role: UserRole.STAFF,
      password: 'staff123',
    },
    {
      id: 'customer-1',
      name: 'Ram Kumar',
      email: 'customer@communitytours.com',
      role: UserRole.CUSTOMER,
      password: 'customer123',
    },
  ];

  let updated = false;

  for (const mock of mockAccounts) {
    const idx = existingUsers.findIndex(u => u.email === mock.email);
    if (idx === -1) {
      // Account missing — add it
      existingUsers.push(mock);
      updated = true;
    } else if (existingUsers[idx].password !== mock.password || existingUsers[idx].role !== mock.role) {
      // Account exists but credentials/role are wrong — fix it
      existingUsers[idx] = { ...existingUsers[idx], password: mock.password, role: mock.role };
      updated = true;
    }
  }

  if (updated) {
    localStorage.setItem('users', JSON.stringify(existingUsers));
  }
}
