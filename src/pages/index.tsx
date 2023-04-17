import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { useUploadModal } from "@/components/home/upload-modal";
import { useQrScannerModal } from "@/components/home/qr-scanner";
import { QrCode, Upload } from "lucide-react";
import PhotoBooth from "@/components/home/photo-booth";
import { useState, useEffect } from "react";
import FarmerDashboard from "./farmer/farmerDashboard";
import RetailerDashboard from "./retailer/retailerDashboard";
import DistributorDashboard from "./distributor/distributorDashboard";
import { useUser } from "../components/UserContext";
import React from "react";

export default function Home({ count }: { count: number }) {
  const { userRole } = useUser();
  const [renderKey, setRenderKey] = useState(0); // Add this line


  const { UploadModal, setShowUploadModal } = useUploadModal();
  const { QrScannerModal, setShowQrScannerModal } = useQrScannerModal();

  console.log(userRole);

  return (
    <Layout>
      {userRole === "farmer" && <FarmerDashboard />}
      {userRole === "retailer" && <RetailerDashboard  />}
      {userRole === "distributor" && <DistributorDashboard  />}
        <UploadModal />
        <QrScannerModal />
        <motion.div
          className="z-10 max-w-2xl px-5 xl:px-0"
          initial="hidden"
          whileInView="show"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h1
            className="font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer>See your Vegtable journey</Balancer>
          </motion.h1>

          <motion.p
            className="mt-6 text-center text-gray-500 md:text-xl"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Balancer ratio={0.6}>
              Looking to ensure the origin and safety of the vegetables you
              consume?
            </Balancer>
          </motion.p>
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="-mb-4">
            <button
              className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              onClick={() => setShowQrScannerModal(true)}
            >
              <QrCode className="h-5 w-5 text-white group-hover:text-black" />
              <p>Scan QR Code</p>
            </button>

            <button
              className="group mx-auto mt-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload className="h-5 w-5 text-white group-hover:text-black" />
              <p>Upload a photo</p>
            </button>
            <p className="mt-2 text-center text-sm text-gray-500">
              Our blockchain-based vegetable traceability platform can help!
            </p>
          </motion.div>
          <PhotoBooth
            input={``}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7ljmRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMklEQVR4nAEnANj/ALjj/4mIh+P+/9Lv/wCn0+xeLxV9cWWUtL0AUz0tKQAAeVU0j4d/y2cTsDiuaawAAAAASUVORK5CYII="
            output={``}
          />
        </motion.div>
    </Layout>
  );
}
