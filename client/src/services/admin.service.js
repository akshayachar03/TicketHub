import api from "../api/api";

const TOKEN_KEY = "adminToken";
const USER_KEY = "adminUser";

const adminService = {
  /* ---------------- Authentication ---------------- */

  async login(credentials) {
    const response = await api.post("/auth/login", credentials);

    const result = response.data;

    if (!result.success) {
      throw new Error(result.message);
    }

    if (result.data.user.role !== "admin") {
      throw new Error("Access denied. Admin account required.");
    }

    localStorage.setItem(TOKEN_KEY, result.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(result.data.user));

    return result;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  headers() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  },

  /* ---------------- Dashboard ---------------- */

  async getDashboardStats() {
    const response = await api.get("/admin/dashboard", {
      headers: this.headers(),
    });

    return response.data;
  },

  /* ---------------- Movies ---------------- */

  async getMovies() {
    const response = await api.get("/admin/movies", {
      headers: this.headers(),
    });

    return response.data;
  },

  async createMovie(data) {
    const response = await api.post("/admin/movies", data, {
      headers: this.headers(),
    });

    return response.data;
  },

  async updateMovie(id, data) {
    const response = await api.put(`/admin/movies/${id}`, data, {
      headers: this.headers(),
    });

    return response.data;
  },

  async deleteMovie(id) {
    const response = await api.delete(`/admin/movies/${id}`, {
      headers: this.headers(),
    });

    return response.data;
  },

  /* ---------------- Users ---------------- */

  async getUsers() {
    const response = await api.get("/admin/users", {
      headers: this.headers(),
    });

    return response.data;
  },

  async getUserById(id) {
    const response = await api.get(`/admin/users/${id}`, {
      headers: this.headers(),
    });

    return response.data;
  },

  async updateUser(id, data) {
    const response = await api.put(`/admin/users/${id}`, data, {
      headers: this.headers(),
    });

    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`, {
      headers: this.headers(),
    });

    return response.data;
  },

  /* ---------------- Bookings ---------------- */

  async getBookings() {
    const response = await api.get("/admin/bookings", {
      headers: this.headers(),
    });

    return response.data;
  },

  async getBooking(id) {
    const response = await api.get(`/admin/bookings/${id}`, {
      headers: this.headers(),
    });

    return response.data;
  },
};

export default adminService;