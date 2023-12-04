import { useCallback } from "react";
import { useMergeLink } from "@mergeapi/react-merge-link";
import useFetchLinkToken from "../hooks/useFetchLinkToken";

/**
 * MergeLinkButton Component
 * 
 * This component renders a button that, when clicked, opens the Merge Link interface.
 * It uses the `useMergeLink` hook from `@mergeapi/react-merge-link` for the Merge Link integration
 * and `useFetchLinkToken` to retrieve the link token required for the Merge Link setup.
 */
const MergeLinkButton = () => {  
  // Callback for handling success event
  const onSuccess = useCallback(async (publicToken) => {
    // This is typically Step 3 in the Merge Link integration process
    try {
      axios.post(
        `${process.env.REACT_APP_SERVER_URL}/account-token`, {
          publicToken
        }
      );
    } catch(error) {
      console.log(error)
    }
   
  }, []);

  // Custom hook to fetch the link token
  const { linkToken } = useFetchLinkToken();

  // Hook from Merge API for initializing and managing the Merge Link
  const { open, isReady } = useMergeLink({
    linkToken,
    onSuccess,
    // Optional: Uncomment and configure the tenantConfig for specific API base URLs
    // tenantConfig: {
    //   apiBaseURL: "https://api-eu.merge.dev" // OR your specified single tenant API base URL
    // },
  });

  // Render the button, disabled if the Merge Link is not ready
  return (
    <button disabled={!isReady} onClick={open}>
      Open Merge Link
    </button>
  );
}

export default MergeLinkButton;
