import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import router, { useRouter } from "next/router";
import { useUser } from "../components/UserContext";
import Layout from "@/components/layout";
const stakeholderOptions = [
  { value: "retailer", label: "Retailer" },
  { value: "distributor", label: "Distributor" },
  { value: "farmer", label: "Farmer" },
];

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    stakeholder: "",
    username: "",
    email: "",
    password: "",
  });
  const { setUserRole } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = formData;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register",
        userData
      );
      if (response.status === 201) {
        // Registration was successful
        console.log(response.data.userEmail);
        // Set the userRole in the UserContext
        setUserRole(response.data.userRole);

        // Redirect user to their respective dashboard
        const { userRole } = response.data;
        if (userRole === "farmer") {
          router.push("/farmer/farmerDashboard");
        } else if (userRole === "retailer") {
          router.push("/retailer/retailerDashboard");
        } else if (userRole === "distributor") {
          router.push("/distributor/distributorDashboard");
        }
      } else {
        // Handle unsuccessful registration
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      // Handle errors during the request
      console.error("Error during registration:", error.message);
    }
  };
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Register User</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-8">
          <h1 className="mb-6 text-center text-2xl font-semibold">
            Register User
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="leading-loose">Stakeholder</label>
              <select
                name="stakeholder"
                value={formData.stakeholder}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                required
              >
                <option value="">Select a stakeholder</option>
                {stakeholderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex flex-col">
              <label className="leading-loose">Name</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
