// API-backed data layer  replaces the old localStorage approach

const API = '/api';

export interface Package {
  id: string;
  name: string;
  type: string;
  price: number;
  duration: number;
  difficulty: string;
  location: string;
  description: string;
  image: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
}

export interface Inquiry {
  id: string;
  type: 'contact' | 'booking';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  package?: string;
  destination?: string;
  travelDate?: string;
  travelers?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'read' | 'replied';
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  tour: string;
  text: string;
  rating: number;
  avatar: string;
  color: string;
}

// Helper to attach admin token
function authHeaders(): HeadersInit {
  const token = localStorage.getItem('ctt_token');
  return token ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } : { 'Content-Type': 'application/json' };
}

async function request<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as any).error || `Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// ── Auth ────────────────────────────────────────────────────────────────────

export const auth = {
  async login(email: string, password: string): Promise<{ token: string; email: string }> {
    const data = await request<{ token: string; email: string }>(`${API}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('ctt_token', data.token);
    return data;
  },
  logout() {
    localStorage.removeItem('ctt_token');
  },
  getToken(): string | null {
    return localStorage.getItem('ctt_token');
  },
  async verify(): Promise<boolean> {
    try {
      await request(`${API}/admin/me`, { headers: authHeaders() });
      return true;
    } catch {
      return false;
    }
  },
};

// ── Packages ────────────────────────────────────────────────────────────────

export const api = {
  // Upload
  async uploadImage(file: File): Promise<{ url: string; filename: string }> {
    const token = localStorage.getItem('ctt_token');
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${API}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error((body as any).error || 'Upload failed');
    }
    return res.json();
  },

  // Public
  async getPackages(): Promise<Package[]> {
    return request(`${API}/packages`);
  },
  async getPackage(id: string): Promise<Package> {
    return request(`${API}/packages/${id}`);
  },

  // Admin
  async createPackage(pkg: Omit<Package, 'id'>): Promise<Package> {
    return request(`${API}/packages`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(pkg) });
  },
  async updatePackage(id: string, pkg: Partial<Package>): Promise<Package> {
    return request(`${API}/packages/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(pkg) });
  },
  async deletePackage(id: string): Promise<void> {
    await request(`${API}/packages/${id}`, { method: 'DELETE', headers: authHeaders() });
  },

  // ── Destinations ────────────────────────────────────────────────────────

  async getDestinations(): Promise<Destination[]> {
    return request(`${API}/destinations`);
  },
  async createDestination(dest: Omit<Destination, 'id'>): Promise<Destination> {
    return request(`${API}/destinations`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(dest) });
  },
  async deleteDestination(id: string): Promise<void> {
    await request(`${API}/destinations/${id}`, { method: 'DELETE', headers: authHeaders() });
  },

  // ── Testimonials ──────────────────────────────────────────────────────

  async getTestimonials(): Promise<Testimonial[]> {
    return request(`${API}/testimonials`);
  },
  async createTestimonial(t: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    return request(`${API}/testimonials`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(t) });
  },
  async updateTestimonial(id: string, t: Partial<Testimonial>): Promise<Testimonial> {
    return request(`${API}/testimonials/${id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify(t) });
  },
  async deleteTestimonial(id: string): Promise<void> {
    await request(`${API}/testimonials/${id}`, { method: 'DELETE', headers: authHeaders() });
  },

  // ── Inquiries ─────────────────────────────────────────────────────────

  async getInquiries(): Promise<Inquiry[]> {
    return request(`${API}/inquiries`, { headers: authHeaders() });
  },
  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'submittedAt' | 'status'>): Promise<Inquiry> {
    return request(`${API}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
  },
  async updateInquiryStatus(id: string, status: Inquiry['status']): Promise<Inquiry> {
    return request(`${API}/inquiries/${id}/status`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) });
  },
  async deleteInquiry(id: string): Promise<void> {
    await request(`${API}/inquiries/${id}`, { method: 'DELETE', headers: authHeaders() });
  },
};
