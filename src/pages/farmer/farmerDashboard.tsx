import Head from 'next/head';
import withAuth from '../../components/auth';
import Layout from "@/components/layout";
import router from 'next/router';

import { useUser } from "../../components/UserContext";
function FarmerDashboard() {

  function AddVegetables() {
    // Redirect user to inventory
    router.push("/registerVegi");
  }

  function ViewData() {
    // Redirect user to inventory
    router.push("/farmer/farmerData");
  }

  const { userRole } = useUser(); 
    return (
    <Layout>
      <Head>
        <title>Farmer Dashboard</title>
      </Head>
      <div className="min-h-screen  flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">Welcome, Farmer!</h1>
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              You can manage your vegetables, view production data, and update information from your Farmer Dashboard.
            </p>
          </div>
          <div className="mt-8 flex flex-col space-y-4">
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-lightBlue-600 text-white rounded-md focus:outline-none hover:from-cyan-700 hover:to-lightBlue-700"
              onClick={() => AddVegetables()}
            >
              Add Vegetables
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-md focus:outline-none hover:from-green-500 hover:to-green-700"
            onClick={() => ViewData()}
            >
              View Production Data
            </button>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(FarmerDashboard);