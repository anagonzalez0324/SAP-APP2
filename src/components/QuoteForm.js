import React, { useState, useEffect, useContext } from "react";
import { createQuote, getCustomers, getServices } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const QuoteForm = () => {
    const [quote, setQuote] = useState({
        customer: "",
        service: "",
        quantity: 0,
        total_price: 0.0,
        status: "Pending",
    });
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState("");
    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomersAndServices = async () => {
            try {
                const [customersResponse, servicesResponse] = await Promise.all([
                    getCustomers(),
                    getServices(authTokens),
                ]);
                setCustomers(customersResponse.data);
                setServices(servicesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCustomersAndServices();
    }, [authTokens]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuote({
            ...quote,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createQuote(quote);
            console.log("Quote created successfully:", response.data);
            setMessage("Quote created successfully!");

            // Redirect without refreshing quote list
            navigate("/quotes"); 
        } catch (err) {
            setMessage("Error creating quote: " + err.message);
            console.error("Quote creation error:", err);
        }
    };

    return (
        <div className="container">
            <h2>Create Quote</h2>
            <Link to="/quotes" className="btn btn-secondary mb-3"> {/* Button moved here */}
                Back to Quotes
            </Link>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Customer</label>
                    <select
                        name="customer"
                        className="form-control"
                        value={quote.customer}
                        onChange={handleChange}
                    >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Service</label>
                    <select
                        name="service"
                        className="form-control"
                        value={quote.service}
                        onChange={handleChange}
                    >
                        <option value="">Select Service</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        value={quote.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Total Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="total_price"
                        className="form-control"
                        value={quote.total_price}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Quote
                </button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default QuoteForm;
