import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  // Get all registered users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
  };

  // Register a new user
  const register = (username, password) => {
    const users = getUsers();
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already exists. Please choose a different one.' };
    }

    // Add new user
    const newUser = {
      username,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true };
  };

  // Login user
  const login = (username, password) => {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const userInfo = { username: user.username };
      setUser(userInfo);
      localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid username or password.' };
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

