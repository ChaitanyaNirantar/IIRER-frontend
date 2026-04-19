import React, { useState, useEffect } from "react";
//import axios from "axios";
import "./Employee.css";
import api from "./api";

function EmailSearchDropdown({ onUserSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        fetchUsers(query);
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchUsers = async (input) => {
    try {
      const response = await api.get("/api/users/search", {
        params: { email: input },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSelect = (user) => {
    setSelectedUser(user);
    setQuery(user.email);
    setResults([]);
    if (onUserSelect) onUserSelect(user);
  };

  return (
    <div className="search-card">
      <h3 className="search-card-title">Search SWTICIE Participant by email</h3>

      <div className="search-input-wrap">
        <input
          type="text"
          placeholder="Search email..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedUser(null);
            if (onUserSelect) onUserSelect(null);
          }}
        />

        {results.length > 0 && (
          <ul className="search-results">
            {results.map((user) => (
              <li key={user.id} onClick={() => handleSelect(user)}>
                <div className="result-email">{user.email}</div>
                <div className="result-meta">
                  {user.name} | ID: {user.id}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedUser && (
        <div className="selected-user-card">
          <div><strong>Selected:</strong> {selectedUser.email}</div>
          <div><strong>Customer ID:</strong> {selectedUser.id}</div>
        </div>
      )}
    </div>
  );
}

export default EmailSearchDropdown;