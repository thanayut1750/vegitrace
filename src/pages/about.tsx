import Layout from "@/components/layout";
import { useUser } from '../components/UserContext';
export default function About() {
  const { userRole } = useUser(); 
  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">About</h1>
          <p className="text-gray-700 leading-relaxed">
            This Vegetable Traceability Platform is designed to improve transparency and efficiency in the vegetable supply chain. By using blockchain technology, we provide a secure and auditable record of the movement of vegetables throughout the supply chain. Our platform enables farmers, distributors, and retailers to work together more efficiently, increasing trust and accountability.
          </p>
        </div>
      </div>
    </Layout>
  );
}
