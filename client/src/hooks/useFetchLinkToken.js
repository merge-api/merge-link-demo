import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch a link token from the server.
 *
 * This hook is responsible for making an HTTP request to the server to retrieve
 * a link token used for the Merge Link integration. It manages the link token state
 * and automatically fetches the token when the component using this hook is mounted.
 */
const useFetchLinkToken = () => {
  const [linkToken, setLinkToken] = useState(null);

  // Function to fetch the link token from the server
  const fetchLinkToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/link-token`
      );
      setLinkToken(response.data.linkToken);
    } catch (error) {
      console.error("Error fetching link token:", error);
    }
  };

  // Effect to fetch the link token once when the component mounts
  useEffect(() => {
    fetchLinkToken();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return { linkToken };
};

export default useFetchLinkToken;
