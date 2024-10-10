import { useState, useEffect } from 'react';

const useDataFetching = (url) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { tickets, users, isLoading };
};

export default useDataFetching;
