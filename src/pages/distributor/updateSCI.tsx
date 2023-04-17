import Head from 'next/head';
import { motion } from 'framer-motion';
import withAuth from '../../components/auth';
import Layout from "@/components/layout";
import { useUser } from "../../components/UserContext";
function UpdateSCI() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Update Supply Chain Information</title>
      </Head>
      <div className="min-h-screen  flex flex-col justify-center items-center">
        <motion.div
          className="w-full max-w-lg bg-white p-8 rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">Update Supply Chain Information</h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            Please enter the updated supply chain information for your vegetables.
          </p>
          {/* Add your form or functionality for updating supply chain information */}
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Supply Chain Information</h2>
              {/* Add your form fields and buttons to update the information */}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
export default withAuth(UpdateSCI);
