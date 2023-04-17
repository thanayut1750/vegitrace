import Head from 'next/head';
import { motion } from 'framer-motion';
import withAuth from '../../components/auth';
import Layout from "@/components/layout";
import { useUser } from "../../components/UserContext";
function RetailerTrace() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Track Shipments</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <motion.div
          className="w-full max-w-2xl bg-white p-8 rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">Track Shipments</h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            Here you can track the shipments of vegetables and monitor their status throughout the supply chain.
          </p>
          {/* Add your table or data visualization for displaying shipment tracking data */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Shipment Tracking</h2>
            <p className="text-gray-700">Display shipment tracking data here.</p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
export default withAuth(RetailerTrace);