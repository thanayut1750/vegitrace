// pages/login.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { motion } from "framer-motion";
import { useUser } from "../../src/components/UserContext";
import Layout from "@/components/layout";
const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { setUserRole } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        formData
      );
      if (response.status === 200) {
        const { userRole } = response.data;
        // Login was successful
        console.log("User logged in successfully:", response.data);
        
        // Store userRole in UserContext
        // Redirect user to their respective dashboard
        setUserRole(userRole);

        if (userRole === "farmer") {
          router.push("/farmer/farmerDashboard");
        } else if (userRole === "retailer") {
          router.push("/retailer/retailerDashboard");
        } else if (userRole === "distributor") {
          router.push("/distributor/distributorDashboard");
        }
      } else {
        // Handle unsuccessful login
        console.error("Login failed:", response.data);
      }
    } catch (error) {
      // Handle errors during the request
      console.error("Error during login:", error.message);
    }
  };
  const { userRole } = useUser(); 
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex min-h-screen items-center justify-center ">
          <div className="w-full max-w-md rounded-lg bg-white p-8">
            <h1 className="mb-6 text-center text-2xl font-semibold">Log In</h1>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col">
                <label className="leading-loose">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mt-4 flex flex-col">
                <label className="leading-loose">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center space-x-4 pt-4">
                <button
                  type="submit"
                  className="to-lightBlue-600 hover:to-lightBlue-700 flex w-full items-center justify-center rounded-md bg-gradient-to-r from-cyan-600 px-4 py-3 text-white hover:from-cyan-700 focus:outline-none"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default LoginPage;
