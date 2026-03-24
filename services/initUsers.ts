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

  const hasAdmin = existingUsers.some(u => u.role === UserRole.ADMIN);
  const hasStaff = existingUsers.some(u => u.role === UserRole.STAFF);
  const hasCustomer = existingUsers.some(u => u.role === UserRole.CUSTOMER);

  const newUsers: StoredUser[] = [];

  if (!hasAdmin) {
    newUsers.push({
      id: 'admin-' + Date.now(),
      name: 'Krishna Admin',
      email: 'admin@communitytours.com',
      role: UserRole.ADMIN,
      password: 'admin123',
    });
  }

  if (!hasStaff) {
    newUsers.push({
      id: 'staff-' + Date.now(),
      name: 'Hari Thapa',
      email: 'staff@communitytours.com',
      role: UserRole.STAFF,
      password: 'staff123',
    });
  }

  if (!hasCustomer) {
    newUsers.push({
      id: 'customer-' + Date.now(),
      name: 'Ram Kumar',
      email: 'customer@communitytours.com',
      role: UserRole.CUSTOMER,
      password: 'customer123',
    });
  }

  if (newUsers.length > 0) {
    const updatedUsers = [...existingUsers, ...newUsers];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
}
