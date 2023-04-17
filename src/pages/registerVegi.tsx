import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../components/UserContext";
import Layout from "@/components/layout";
import Web3 from "web3";
import VegetableTraceabilityABI from "../abis/VegetableTraceability.json";

export default function Register() {
  const [formData, setFormData] = useState({
    vegetableType: "",
    harvestDate: "",
    farmLocation: "",
    productionPractice: "",
  });
  //ABI interact with smart contract
  const getContractInstance = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const networkId = 80001; // Mumbai Testnet network ID

        const networkData = VegetableTraceabilityABI.networks[networkId];

        if (networkData) {
          const contractInstance = new web3.eth.Contract(
            VegetableTraceabilityABI.abi,
            networkData.address
          );
          return { web3, contractInstance };
        } else {
          alert("Contract not deployed on the detected network.");
          return null;
        }
      } catch (error) {
        console.error("Error initializing web3:", error);
        return null;
      }
    } else {
      alert("Please install MetaMask.");
      return null;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { web3, contractInstance } = await getContractInstance();

    if (contractInstance) {
      try {
        const accounts = await web3.eth.getAccounts();

        contractInstance.events.VegetableAdded({}, (error, event) => {
          if (error) {
            console.error('Error in VegetableAdded event:', error);
          } else {
            console.log('VegetableAdded event:', event);
          }
        });
        // Convert the harvest date to a Unix timestamp (seconds since epoch)
        const harvestTimestamp = Math.floor(
          new Date(formData.harvestDate).getTime() / 1000
        );

        // Update the formData object with the timestamp
        const updatedFormData = {
          ...formData,
          harvestDate: harvestTimestamp,
        };

        const result = await contractInstance.methods
          .addVegetable(
            updatedFormData.vegetableType,
            updatedFormData.harvestDate,
            updatedFormData.farmLocation,
            updatedFormData.productionPractice
          )
          .send({ from: accounts[0], timeoutBlocks: 50 }); // Increase the timeoutBlocks to 200

      console.log('Transaction result:', result);
      // Handle the result, update UI, show success message, et
      alert("Your Vegetable has been added successfully");

      } catch (error) {
        console.error("Error calling smart contract function:", error);
        // Handle the error, show an error message, etc.
      }
    }
  };

  const { userRole } = useUser();
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex min-h-screen flex-col justify-center bg-gray-100 py-6 sm:py-12"
      >
        <div className="relative py-3 sm:mx-auto sm:max-w-xl">
          <div className="to-lightBlue-500 absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-cyan-400 shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
          <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="mx-auto max-w-md">
              <div>
                <h1 className="text-2xl font-semibold">Register Vegetable</h1>
              </div>
              <form
                onSubmit={handleSubmit}
                className="divide-y divide-gray-200"
              >
                <div className="space-y-4 py-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Vegetable Type</label>
                    <input
                      type="text"
                      name="vegetableType"
                      value={formData.vegetableType}
                      onChange={handleChange}
                      className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Harvest Date</label>
                    <input
                      type="date"
                      name="harvestDate"
                      value={formData.harvestDate}
                      onChange={handleChange}
                      className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Farm Location</label>
                    <input
                      type="text"
                      name="farmLocation"
                      value={formData.farmLocation}
                      onChange={handleChange}
                      className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Production Practice</label>
                    <input
                      type="text"
                      name="productionPractice"
                      value={formData.productionPractice}
                      onChange={handleChange}
                      className="rounded-md border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none"
                      required
                    />
                  </div>
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
        </div>
      </motion.div>
    </Layout>
  );
}
