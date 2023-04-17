import Head from 'next/head';
import Layout from "@/components/layout";
import { useUser } from '../components/UserContext';

export default function Contact() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <Head>
        <title>Contact</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">Contact Us</h1>
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or need assistance, please feel free to reach out to us.
            </p>
            <p className="mt-4 text-gray-700">
              <strong>Email:</strong> support@vegetabletraceability.com
            </p>
            <p className="mt-2 text-gray-700">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
