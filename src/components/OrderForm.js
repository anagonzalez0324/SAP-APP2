import React, { useState, useEffect, useContext } from "react";
import { createOrder, getCustomers, getProducts, getServices } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 
import AuthContext from "../context/AuthContext";

const OrderForm = () => {
    const [order, setOrder] = useState({
        order_number: uuidv4(), // Auto-generate order number
        customer: "",
        due_date: "",
        status: "Pending",
        items: [], 
        design_type: "", // New field
        print_type: "",  // New field
        garment_type: "", // New field
        sizes: {},        // New field (object to store quantities for each size)
        notes: "",        // New field
      });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customerError, setCustomerError] = useState(null);

  useEffect(() => {
    const fetchCustomersAndProducts = async () => {
      try {
        const [customersResponse, productsResponse] = await Promise.all([
          getCustomers(authTokens),
          getProducts(authTokens),
        ]);
        setCustomers(customersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // If unauthorized, redirect to login
          navigate("/login");
        } else {
          console.error("Error fetching data:", error);
        }
      } finally {
        setIsLoadingCustomers(false);
      }
    };

    fetchCustomersAndProducts();
  }, [authTokens, navigate]); // Add navigate to dependency array

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...order.items];
    newItems[index][field] = value;
    setOrder({ ...order, items: newItems });
  };

  const handleAddLineItem = () => {
    setOrder({ ...order, items: [...order.items, { product: "", quantity: 1 }] });
  };

  const handleRemoveLineItem = (index) => {
    const newItems = [...order.items];
    newItems.splice(index, 1);
    setOrder({ ...order, items: newItems });
  };

  const handleSizeChange = (size, quantity) => {
    setOrder({ ...order, sizes: { ...order.sizes, [size]: quantity } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalPrice = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const orderData = { ...order, total_price: totalPrice };

    try {
      const response = await createOrder(orderData);
      setMessage("Order created successfully!");
      console.log("Order creation response:", response);
      navigate("/orders");
    } catch (err) {
      setMessage("Error creating order: " + err.message);
      console.error("Order creation error:", err.response.data);
    }
  };

  return (
    <div className="container">
      <h2>Create Order</h2>
      <Link to="/orders" className="btn btn-secondary mb-3">
        Back to Orders
      </Link>
      <form onSubmit={handleSubmit}>
        {/* Order Number (auto-generated but editable) */}
        <div className="form-group">
          <label htmlFor="order_number">Order Number:</label>
          <input
            type="text"
            id="order_number"
            name="order_number"
            className="form-control"
            value={order.order_number}
            onChange={handleChange}
          />
        </div>
          {/* Customer (existing dropdown) */}
        <div className="form-group">
        {/*  existing customer dropdown  */}
        </div>
        {/* Due Date (existing) */}
        <div className="form-group">
        {/*  existing due date picker  */}
        </div>
        {/* Design Type (new dropdown) */}
        <div className="form-group">
          <label htmlFor="design_type">Design Type:</label>
          <select
            id="design_type"
            name="design_type"
            className="form-control"
            value={order.design_type}
            onChange={handleChange}
          >
            <option value="">Select Design Type</option>
            <option value="screen_print">Screen Print</option>
            <option value="embroidery">Embroidery</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Print Type (new dropdown) */}
        <div className="form-group">
          <label htmlFor="print_type">Print Type:</label>
          <select
            id="print_type"
            name="print_type"
            className="form-control"
            value={order.print_type}
            onChange={handleChange}
          >
            <option value="">Select Print Type</option>
            <option value="plastisol">Plastisol</option>
            <option value="water_based">Water-Based</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Garment Type (new dropdown) */}
        <div className="form-group">
          <label htmlFor="garment_type">Garment Type:</label>
          <select
            id="garment_type"
            name="garment_type"
            className="form-control"
            value={order.garment_type}
            onChange={handleChange}
          >
            <option value="">Select Garment Type</option>
            <option value="t_shirt">T-Shirt</option>
            <option value="hoodie">Hoodie</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Sizes and Quantities */}
        {/* ... (logic for adding/removing line items and handling size/quantity changes) ... */}
      <button type="submit" className="btn btn-primary">Create Order</button>
      {message && <p>{message}</p>}
    </form>
  </div>
);
};

export default OrderForm;