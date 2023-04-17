import Head from 'next/head';
import { motion } from 'framer-motion';
import withAuth from '../../components/auth';
import Layout from "@/components/layout";
import { useUser } from "../../components/UserContext";
function RetailerDashboard() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Retailer Dashboard</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <motion.div
          className="w-full max-w-md bg-white p-8 rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">Welcome, Retailer!</h1>
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              You can verify the authenticity and quality of the vegetables, manage your inventory, and track shipments from your Retailer Dashboard.
            </p>
          </div>
          <div className="mt-8 flex flex-col space-y-4">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-lightBlue-600 text-white rounded-md focus:outline-none hover:from-cyan-700 hover:to-lightBlue-700">
              Verify Vegetables
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md focus:outline-none hover:from-green-500 hover:to-green-700">
              Manage Inventory
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-md focus:outline-none hover:from-yellow-500 hover:to-yellow-700">
              Track Shipments
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default withAuth(RetailerDashboard);