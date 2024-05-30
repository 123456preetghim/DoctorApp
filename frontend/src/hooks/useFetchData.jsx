import { useEffect, useState } from 'react';
import { token } from '../config';

export const useFetchData = (url) => {
  const [data, setData] = useState([]); // Initialize data state with null
  const [loading, setLoading] = useState(false); // Initialize loading state with true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      setLoading(true);
       // Set loading to true while fetching data
      try {
        console.log(token)
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message + ':(' ); // Remove 'Authorization denied' from the error message
        } 
        setData(result.data); // Set data if response is ok
        setError(null); // Clear error state if fetch is successful
      } catch (err) {
        setError(err.message); // Set error message if an error occurs during fetch
      } finally {
        setLoading(false); // Set loading back to false after fetching data (even if there's an error)
      }
    };

    fetchData(); // Call fetchData function

   }, [url]); // Add url to the dependency array

  // Return loading, data, and error states
  return {  data, loading, error };
};

export default useFetchData; // Export the custom hook
