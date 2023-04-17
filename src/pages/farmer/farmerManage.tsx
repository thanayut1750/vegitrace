import Head from 'next/head';
import withAuth from '../../components/auth';
import Layout from "@/components/layout";
import { useUser } from "../../components/UserContext";
function FarmerManage() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Manage Vegetables</title>
      </Head>
      <div className="min-h-screen  flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">Manage Vegetables</h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            You can add, update, or delete vegetables from this page. Please enter the required information for each operation.
          </p>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Add Vegetable</h2>
              {/* Add your form or functionality for adding a vegetable */}
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Update Vegetable</h2>
              {/* Add your form or functionality for updating a vegetable */}
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Delete Vegetable</h2>
              {/* Add your form or functionality for deleting a vegetable */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(FarmerManage);
