
import React, { useState, useEffect } from "react";
import { getQuotes, deleteQuote } from "../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchQuotes = async () => {
        try {
          const response = await axios.get('/api/quotes/'); // First request
          const quotesUrl = response.data.quotes; // Get the quotes URL
  
          const quotesResponse = await axios.get(quotesUrl); // Second request
          setQuotes(quotesResponse.data);
          setIsLoading(false);
        } catch (err) {
          setError(err.message || 'Error fetching quotes');
          setIsLoading(false);
        }
      };
  
      fetchQuotes();
    }, []);

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this quote?")) {
            try {
                await deleteQuote(id);
                setQuotes(quotes.filter((q) => q.id !== id));
                navigate("/quotes");
            } catch (err) {
                setError(err.message || "Error deleting quote");
            }
        }
    };

    return (
        <div className="container">
            <h2>Quote List</h2>
            <ul className="list-group">
                {quotes.map(quote => (
                    <li key={quote.id} className="list-group-item">
                        {quote.customer.name} - {quote.service.name} - {quote.quantity} units - ${quote.total_price}
                        <button onClick={() => handleDelete(quote.id)} className="btn btn-danger btn-sm float-right">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuoteList;
