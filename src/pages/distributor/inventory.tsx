import Head from 'next/head';
import { motion } from 'framer-motion';
import withAuth from '../../components/auth';
import Layout from "@/components/layout";
import { useUser } from "../../components/UserContext";
function Inventory() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Manage Inventory</title>
      </Head>
      <div className="min-h-screen  flex flex-col justify-center items-center">
        <motion.div
          className="w-full max-w-2xl bg-white p-8 rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">Manage Inventory</h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            You can add, update, or remove vegetables from your inventory. Please enter the required information for each operation.
          </p>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Add Vegetable to Inventory</h2>
              {/* Add your form or functionality for adding a vegetable to the inventory */}
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Update Vegetable in Inventory</h2>
              {/* Add your form or functionality for updating a vegetable in the inventory */}
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Remove Vegetable from Inventory</h2>
              {/* Add your form or functionality for removing a vegetable from the inventory */}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
export default withAuth(Inventory);