import { useState } from 'react';
import UsersService from 'services/UsersService';

const useUsers = () => {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    setIsRequestLoading(true);
    setRequestError(null);

    const { result, error } = await UsersService.getUsers();

    setRequestError(error);
    setIsRequestLoading(false);

    if (result) {
      setUsers(result);
    }
  };

  return { users, getUsers, isRequestLoading, requestError };
};

export default useUsers;
