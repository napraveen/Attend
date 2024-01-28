import React from 'react';
import { useEffect, useState } from 'react';
import IsAuthenticated from './IsAuthenticated';
const GetUserDetails = () => {
  const { authenticated, username } = IsAuthenticated();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const GetUserDetails = async () => {
      console.log(username);
      const response = await fetch(
        `http://localhost:4001/api/user/${username}`
      );

      const user = await response.json();
      console.log(user);

      setUserDetails(user);
    };

    GetUserDetails();
  }, [username]);
  return { userDetails };
};

export default GetUserDetails;
