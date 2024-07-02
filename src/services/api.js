// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:8000/api";

axios.interceptors.request.use(
  (config) => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (authTokens) {
      config.headers["Authorization"] = `Bearer ${authTokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getOrders = async () => {
  return await axios.get(`${API_URL}/orders/`);
};

export const createOrder = async (order) => {
  return await axios.post(`${API_URL}/orders/`, order);
};

export const getCustomers = async () => {
  return await axios.get(`${API_URL}/customers/`);
};

export const createCustomer = async (customer) => {
  return await axios.post(`${API_URL}/customers/`, customer);
};

export const deleteCustomer = async (id) => {
  return await axios.delete(`${API_URL}/customers/${id}/`);
};

export const getProducts = async () => {
  return await axios.get(`${API_URL}/products/`);
};

export const createProduct = async (product) => {
  return await axios.post(`${API_URL}/products/`, product);
};

// Category API
export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories/`);
};

export const createCategory = async (category) => {
  return await axios.post(`${API_URL}/categories/`, category);
};

export const deleteCategory = async (id) => {
  return await axios.delete(`${API_URL}/categories/${id}/`);
};

// Supplier API
export const getSuppliers = async () => {
  return await axios.get(`${API_URL}/suppliers/`);
};

export const createSupplier = async (supplier) => {
  return await axios.post(`${API_URL}/suppliers/`, supplier);
};

export const deleteSupplier = async (id) => {
  return await axios.delete(`${API_URL}/suppliers/${id}/`);
};

// Inventory Item API
export const getInventoryItems = async () => {
  return await axios.get(`${API_URL}/inventory-items/`);
};

export const createInventoryItem = async (inventoryItem) => {
  return await axios.post(`${API_URL}/inventory-items/`, inventoryItem);
};

export const deleteInventoryItem = async (id) => {
  return await axios.delete(`${API_URL}/inventory-items/${id}/`);
};

// Stock Adjustment API
export const getStockAdjustments = async () => {
  return await axios.get(`${API_URL}/stock-adjustments/`);
};

export const createStockAdjustment = async (stockAdjustment) => {
  return await axios.post(`${API_URL}/stock-adjustments/`, stockAdjustment);
};

export const deleteStockAdjustment = async (id) => {
  return await axios.delete(`${API_URL}/stock-adjustments/${id}/`);
};

export const getTasks = async () => {
  return await axios.get(`${API_URL}/tasks/`);
};

export const createTask = async (task) => {
  return await axios.post(`${API_URL}/tasks/`, task);
};

export const deleteTask = async (id) => {
    return await axios.delete(`${API_URL}/tasks/${id}/`);
  };

// Production Task API
export const getProductionTasks = async () => {
  return await axios.get(`${API_URL}/production-tasks/`);
};

export const createProductionTask = async (productionTask) => {
  return await axios.post(`${API_URL}/production-tasks/`, productionTask);
};

export const deleteProductionTask = async (id) => {
  return await axios.delete(`${API_URL}/production-tasks/${id}/`);
};

// Task Assignment API
export const getTaskAssignments = async () => {
  return await axios.get(`${API_URL}/task-assignments/`);
};

export const createTaskAssignment = async (taskAssignment) => {
  return await axios.post(`${API_URL}/task-assignments/`, taskAssignment);
};

export const deleteTaskAssignment = async (id) => {
  return await axios.delete(`${API_URL}/task-assignments/${id}/`);
};

// Production File API
export const getProductionFiles = async () => {
  return await axios.get(`${API_URL}/production-files/`);
};

export const uploadProductionFile = async (productionFile) => {
  return await axios.post(`${API_URL}/production-files/`, productionFile, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProductionFile = async (id) => {
  return await axios.delete(`${API_URL}/production-files/${id}/`);
};

// Service API (Updated)
export const getServices = async () => {
  return await axios.get(`${API_URL}/sales/services/`); 
};
export const createService = async (service) => {
  return await axios.post(`${API_URL}/sales/services/`, service); 
};
export const deleteService = async (id) => {
  return await axios.delete(`${API_URL}/sales/services/${id}/`); 
};
// Pricing Matrix API (Updated)
export const getPricingMatrices = async () => {
  return await axios.get(`${API_URL}/sales/pricing-matrices/`); 
};
export const createPricingMatrix = async (pricingMatrix) => {
  return await axios.post(`${API_URL}/sales/pricing-matrices/`, pricingMatrix); 
};
export const deletePricingMatrix = async (id) => {
  return await axios.delete(`${API_URL}/sales/pricing-matrices/${id}/`); 
};

// Quote API
export const getQuotes = async () => {
  return await axios.get(`${API_URL}/sales/quotes/`); 
};

export const createQuote = async (quote) => {
  return await axios.post(`${API_URL}/sales/quotes/`, quote); 
};

export const deleteQuote = async (id) => {
  return await axios.delete(`${API_URL}/sales/quotes/${id}/`); 
};

export const getPipelineStages = async () => {
  return await axios.get(`${API_URL}/sales/pipeline-stages/`); 
};

// User API
export const getUsers = async () => {
  return await axios.get(`${API_URL}/users/`); 
};

// Sales Note API (Updated)
export const getSalesNotes = async () => {
  return await axios.get(`${API_URL}/sales/sales-notes/`);
};

export const createSalesNote = async (salesNote) => {
  return await axios.post(`${API_URL}/sales/sales-notes/`, salesNote);
};

export const deleteSalesNote = async (id) => {
  return await axios.delete(`${API_URL}/sales/sales-notes/${id}/`); 
};

// Follow-Up Reminder API (Updated)
export const getFollowUpReminders = async () => {
  return await axios.get(`${API_URL}/sales/follow-up-reminders/`);
};

export const createFollowUpReminder = async (followUpReminder) => {
  return await axios.post(`${API_URL}/sales/follow-up-reminders/`, followUpReminder);
};

export const deleteFollowUpReminder = async (id) => {
  return await axios.delete(`${API_URL}/sales/follow-up-reminders/${id}/`);
};

// Sales Pipeline Stage API
export const getSalesPipelineStages = async () => {
  return await axios.get(`${API_URL}/sales/sales-pipeline-stages/`);
};

export const getArtworkJobs = async () => {
  return await axios.get(`${API_URL}/artwork-jobs/`);
};

export const createArtworkJob = async (job) => {
  return await axios.post(`${API_URL}/artwork-jobs/`, job);
};

export const uploadArtworkFile = async (fileData) => {
  return await axios.post(`${API_URL}/files/`, fileData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteArtworkJob = async (id) => {
    return await axios.delete(`${API_URL}/artwork-jobs/${id}/`);
  };
