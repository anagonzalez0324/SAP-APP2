import React, { useState, useEffect } from "react";
import { getQuotes, deleteQuote } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [needsRefresh, setNeedsRefresh] = useState(false);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await getQuotes();
                setQuotes(response.data);
            } catch (err) {
                setError(err.message || "Error fetching quotes");
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuotes();
    }, [needsRefresh]); // Include needsRefresh dependency

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this quote?")) {
            try {
                await deleteQuote(id);
                setNeedsRefresh(true);
            } catch (err) {
                setError(err.message || "Error deleting quote");
            }
        }
    };

    const handleQuoteCreated = () => {
        setNeedsRefresh(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2>Quote List</h2>
            <Link to="/create-quote" className="btn btn-primary mb-3">
                Create Quote
            </Link>
            <ul className="list-group">
                {Array.isArray(quotes) && quotes.length > 0 ? (
                    quotes.map((quote) => (
                        <li key={quote.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    {quote.customer?.name} - {quote.service?.name} -{" "}
                                    {quote.quantity} units - ${quote.total_price}
                                </div>
                                <button
                                    onClick={() => handleDelete(quote.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No quotes found.</p>
                )}
            </ul>
        </div>
    );
};

export default QuoteList;

