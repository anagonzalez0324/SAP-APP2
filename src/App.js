// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import ErrorPage from './components/ErrorPage'
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SupplierList from './components/SupplierList';
import SupplierForm from './components/SupplierForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import InventoryItemList from './components/InventoryItemList';
import InventoryItemForm from './components/InventoryItemForm';
import StockAdjustmentList from './components/StockAdjustmentList';
import StockAdjustmentForm from './components/StockAdjustmentForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ProductionTaskList from './components/ProductionTaskList';
import ProductionTaskForm from './components/ProductionTaskForm';
import TaskAssignmentList from './components/TaskAssignmentList';
import TaskAssignmentForm from './components/TaskAssignmentForm';
import ProductionFileList from './components/ProductionFileList';
import ProductionFileUpload from './components/ProductionFileUpload';
import ServiceList from './components/ServiceList';
import ServiceForm from './components/ServiceForm';
import PricingMatrixList from './components/PricingMatrixList';
import PricingMatrixForm from './components/PricingMatrixForm';
import QuoteList from './components/QuoteList';
import QuoteForm from './components/QuoteForm';
import PipelineStageList from './components/PipelineStageList';
import SalesNoteList from './components/SalesNoteList';
import FollowUpReminderList from './components/FollowUpReminderList';
import SalesPipeline from './components/SalesPipeline';
import ArtworkJobList from './components/ArtworkJobList';
import ArtworkJobForm from './components/ArtworkJobForm';
import ArtworkFileUpload from './components/ArtworkFileUpload';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router> 
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<PrivateRoute><MainLayout /></PrivateRoute>}/>
                    <Route path="orders" element={<OrderList />} />
                    <Route path="create-order" element={<OrderForm />} />
                    <Route path="customers" element={<CustomerList />} />
                    <Route path="create-customer" element={<CustomerForm />} />
                    <Route path="products" element={<ProductList />} />
                    <Route path="create-product" element={<ProductForm />} />
                    <Route path="suppliers" element={<SupplierList />} />
                    <Route path="create-supplier" element={<SupplierForm />} />
                    <Route path="categories" element={<CategoryList />} />
                    <Route path="create-category" element={<CategoryForm />} />
                    <Route path="inventory-items" element={<InventoryItemList />} />
                    <Route path="create-inventory-item" element={<InventoryItemForm />} />
                    <Route path="stock-adjustments" element={<StockAdjustmentList />} />
                    <Route path="create-stock-adjustment" element={<StockAdjustmentForm />} />
                    <Route path="tasks" element={<TaskList />} />
                    <Route path="create-task" element={<TaskForm />} />
                    <Route path="production-tasks" element={<ProductionTaskList />} />
                    <Route path="create-production-task" element={<ProductionTaskForm />} />
                    <Route path="task-assignments" element={<TaskAssignmentList />} />
                    <Route path="create-task-assignment" element={<TaskAssignmentForm />} />
                    <Route path="production-files" element={<ProductionFileList />} />
                    <Route path="upload-production-file" element={<ProductionFileUpload />} />
                    <Route path="services" element={<ServiceList />} />
                    <Route path="create-service" element={<ServiceForm />} />
                    <Route path="pricing-matrices" element={<PricingMatrixList />} />
                    <Route path="create-pricing-matrix" element={<PricingMatrixForm />} />
                    <Route path="quotes" element={<QuoteList />} />
                    <Route path="create-quote" element={<QuoteForm />} />
                    <Route path="pipeline-stages" element={<PipelineStageList />} />
                    <Route path="sales-notes" element={<SalesNoteList />} />
                    <Route path="follow-up-reminders" element={<FollowUpReminderList />} />
                    <Route path="sales-pipeline" element={<SalesPipeline />} />
                    <Route path="artwork-jobs" element={<ArtworkJobList />} />
                    <Route path="create-artwork-job" element={<ArtworkJobForm />} />
                    <Route path="upload-artwork-file" element={<ArtworkFileUpload />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
