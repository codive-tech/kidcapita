// API Configuration and Helper Functions
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  console.log('API Request:', url, config);

  try {
    const response = await fetch(url, config);
    
    // Check if response has content
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Invalid response from server');
    }

    if (!response.ok) {
      throw new Error(data.message || data.error || `API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:5000');
    }
    throw error;
  }
};

// Public API calls
export const api = {
  // Curriculum
  getLevels: () => fetchAPI('/levels/public'),
  
  // Programs
  getPrograms: () => fetchAPI('/programs/public'),
  
  // Pricing
  getPricing: () => fetchAPI('/pricing'),
  
  // Bookings
  createBooking: (data) => fetchAPI('/bookings', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Contact
  sendContactMessage: (data) => fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Auth
  login: (credentials) => fetchAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getCurrentUser: (token) => fetchAPI('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  // Admin endpoints
  getBookings: (token) => fetchAPI('/bookings', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  getStudents: (token) => fetchAPI('/students', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  getBatches: (token) => fetchAPI('/batches', {
    headers: { Authorization: `Bearer ${token}` },
  }),
  
  getContactMessages: (token) => fetchAPI('/contact', {
    headers: { Authorization: `Bearer ${token}` },
  }),
};

export default api;

