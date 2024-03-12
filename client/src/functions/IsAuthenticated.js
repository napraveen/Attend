import React, { useEffect, useState } from "react";
import axios from "axios";

const IsAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3050/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.authenticated) {
          setAuthenticated(true);
          setUsername(response.data.username);
          setEmail(response.data.email);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error checking authentication:", error);
        setLoading(false);
      });
  }, []);

  return { authenticated, loading, username, email };
};

export default IsAuthenticated;
