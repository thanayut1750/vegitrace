import { createContext, useContext, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

interface UserContextType {
  userRole: string;
  setUserRole: (role: string) => void;
  logout: () => void; // Add logout function to the context
}

const UserContext = createContext<UserContextType>({
  userRole: "",
  setUserRole: () => {},
  logout: async () => {}, // Provide a default implementation
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false); // Add this line
  const router = useRouter(); // Initialize useRouter

  // Implement the logout function
  const logout = async () => {
    setUserRole("");
    await router.push("/../");

  };

  return (
    <UserContext.Provider value={{ userRole, setUserRole, logout }}>
      {children}
    </UserContext.Provider>
  );
};
