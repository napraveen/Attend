import React from "react";
import { useEffect, useState } from "react";
import IsAuthenticated from "./IsAuthenticated";
const GetUserDetails = () => {
  const { authenticated, username, email } = IsAuthenticated();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const GetUserDetails = async () => {
      console.log(username);
      console.log(email);
      const response = await fetch(`http://localhost:3050/api/user/${email}`);

      const user = await response.json();
      console.log(user);

      setUserDetails(user);
    };

    GetUserDetails();
  }, [email]);
  return { userDetails };
};

export default GetUserDetails;
