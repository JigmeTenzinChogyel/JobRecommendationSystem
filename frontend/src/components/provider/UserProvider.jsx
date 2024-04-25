import { createContext, useEffect, useState } from 'react';
import api from '../../api';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        updateUser();
    }, []);

    // Function to update the user details
    const updateUser = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/user/');
            setUser(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Value object to be passed to the provider
    const value = {
        user,
        loading,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};