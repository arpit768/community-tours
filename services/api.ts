import type { User, Tour, Booking, AppNotification } from '../types';

// ─── Base URL ────────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// ─── Token helpers ───────────────────────────────────────────────────────────

export const getToken = () => localStorage.getItem('auth_token');
export const setToken = (t: string) => localStorage.setItem('auth_token', t);
export const clearToken = () => {
  localStorage.removeItem('auth_token');
};

// ─── Fetch wrapper ───────────────────────────────────────────────────────────

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(body.message || body.errors?.[0]?.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<User> {
  const data = await request<{ token: string; user: User }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data.user;
}

export async function signup(name: string, email: string, password: string): Promise<User> {
  const data = await request<{ token: string; user: User }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  setToken(data.token);
  return data.user;
}

export async function getMe(): Promise<User> {
  const data = await request<{ user: User }>('/auth/me');
  return data.user;
}

export async function logout(): Promise<void> {
  try {
    await request('/auth/logout', { method: 'POST' });
  } catch {
    // Logout even if server request fails
  }
  clearToken();
}

// ─── Tours ───────────────────────────────────────────────────────────────────

export async function getTours(params?: Record<string, string>): Promise<Tour[]> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  const data = await request<{ tours: Tour[] }>(`/tours${query}`);
  return data.tours;
}

export async function createTour(data: Omit<Tour, 'id' | 'createdBy'>): Promise<Tour> {
  const res = await request<{ tour: Tour }>('/tours', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.tour;
}

export async function updateTour(id: string, data: Partial<Tour>): Promise<Tour> {
  const res = await request<{ tour: Tour }>(`/tours/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
  return res.tour;
}

export async function deleteTour(id: string): Promise<void> {
  await request(`/tours/${id}`, { method: 'DELETE' });
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export async function getBookings(): Promise<Booking[]> {
  const data = await request<{ bookings: Booking[] }>('/bookings');
  return data.bookings;
}

export async function createBooking(
  data: Omit<Booking, 'id' | 'customerId' | 'status'>
): Promise<Booking> {
  const res = await request<{ booking: Booking }>('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.booking;
}

export async function updateBookingStatus(
  id: string,
  status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
): Promise<Booking> {
  const res = await request<{ booking: Booking }>(`/bookings/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return res.booking;
}

// ─── Notifications ───────────────────────────────────────────────────────────

export async function getNotifications(): Promise<AppNotification[]> {
  const data = await request<{ notifications: AppNotification[] }>('/notifications');
  return data.notifications;
}

export async function markNotificationsRead(): Promise<void> {
  await request('/notifications/read', { method: 'POST' });
}

// ─── Users (Admin) ───────────────────────────────────────────────────────────

export async function getUsers(roles?: string): Promise<User[]> {
  const query = roles ? `?role=${roles}` : '';
  const data = await request<{ users: User[] }>(`/users${query}`);
  return data.users;
}

export async function createStaffUser(data: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): Promise<User> {
  const res = await request<{ token: string; user: User }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ ...data, role: 'STAFF' }),
  });
  return res.user;
}

export async function deleteUser(id: string): Promise<void> {
  await request(`/users/${id}`, { method: 'DELETE' });
}

// ─── Analytics ───────────────────────────────────────────────────────────────

export async function getAnalytics() {
  return request<{
    tours: { total: number; verified: number; pending: number; rejected: number };
    bookings: { total: number; active: number; completed: number };
    revenue: number;
    users: { staff: number; customers: number };
    locationStats: Record<string, number>;
    typeStats: Record<string, number>;
  }>('/analytics/stats');
}
