import Head from "next/head";
import { motion } from "framer-motion";
import withAuth from "../../components/auth";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import VegetableTraceability from "../../abis/VegetableTraceability.json";
import QRCode from "qrcode.react";
import { AnimatePresence } from "framer-motion";

import { Contract } from "web3-eth-contract";
import Web3 from "web3";

function FarmerData() {
  const [vegetableData, setVegetableData] = useState([]);
  const [contractInstance, setContractInstance] = useState<Contract | null>(
    null
  );
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [showQRCodePopup, setShowQRCodePopup] = useState(false);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      listenForAccountChanges();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const listenForAccountChanges = () => {
    window.ethereum.on("accountsChanged", (accounts) => {
      loadBlockchainData();
    });
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    if (web3) {
      const accounts = await web3.eth.getAccounts();
      const networkId = 80001;
      const networkData = VegetableTraceability.networks[networkId];
      const abi = VegetableTraceability.abi;
      const address = networkData.address;
      console.log(address);
      const contract = new web3.eth.Contract(abi, address);
      setContractInstance(contract);
    }
  };

  const fetchVegetableData = async () => {
    console.log(contractInstance);
    if (contractInstance) {
      try {
        const vegetableCount = await contractInstance.methods
          .vegetableCounter()
          .call();

        console.log("Vegetable count:", vegetableCount);

        const data = [];
        for (let i = 1; i <= vegetableCount; i++) {
          try {
            console.log("Fetching data for vegetable ID:", i);

            const vegetable = await contractInstance.methods
              .getVegetable(i)
              .call();
            data.push({
              id: i,
              vegetableType: vegetable[0],
              harvestDate: new Date(vegetable[1] * 1000),
              location: vegetable[2],
              productionPractice: vegetable[3],
            });
          } catch (error) {
            console.error(`Error fetching vegetable data for ID ${i}:`, error);
          }
        }
        // console.log("Fetched data:", data); // Log the fetched data
        setVegetableData(data);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      await loadWeb3();
      await loadBlockchainData();
    };

    init();
  }, []);

  useEffect(() => {
    fetchVegetableData();
  }, [contractInstance]);

  const handleVegetableClick = (veg) => {
    setSelectedVegetable(veg);
    setShowQRCodePopup(true);
  };

  const closePopup = () => {
    setShowQRCodePopup(false);
  };

  return (
    <Layout>
      <Head>
        <title>View Production Data</title>
      </Head>
      <div className="flex  min-h-screen flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-2xl rounded-lg bg-white p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-6 text-center text-2xl font-semibold">
            View Production Data
          </h1>
          <p className="mb-6 leading-relaxed text-gray-700">
            Here you can view your vegetable production data, including harvest
            dates, locations, and other important information.
          </p>
          {/* Add your table or data visualization for displaying production data */}

          <div className="rounded-lg border border-gray-200 p-4">
            <h2 className="mb-4 text-xl font-semibold">Production Data</h2>
            {vegetableData.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="border-b border-gray-200 py-2">Type</th>
                    <th className="border-b border-gray-200 py-2">
                      Harvest Date
                    </th>
                    <th className="border-b border-gray-200 py-2">Location</th>
                    <th className="border-b border-gray-200 py-2">
                      Production Practice
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vegetableData.map((veg) => (
                    <tr key={veg.id} onClick={() => handleVegetableClick(veg)}>
                      <AnimatePresence>
                        {showQRCodePopup && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40 p-4"
                            onMouseDownCapture={closePopup}
                          >
                            <motion.div
                              className="rounded-lg bg-white p-6 shadow-md"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <h3 className="mb-2 text-xl font-semibold">
                                QR Code for Product
                              </h3>
                              <QRCode
                                value={JSON.stringify(selectedVegetable)}
                                size={256}
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                                level="Q"
                                includeMargin={true}
                              />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <td className="border-b border-gray-200 py-2">
                        {veg.vegetableType}
                      </td>
                      <td className="border-b border-gray-200 py-2">
                        {veg.harvestDate.toLocaleDateString()}
                      </td>
                      <td className="border-b border-gray-200 py-2">
                        {veg.location}
                      </td>
                      <td className="border-b border-gray-200 py-2">
                        {veg.productionPractice}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-700">No production data available.</p>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default withAuth(FarmerData);
