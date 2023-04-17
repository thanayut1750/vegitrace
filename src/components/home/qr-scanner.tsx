import Modal from "@/components/shared/modal";
import logo from "/public/images/vegetables.png";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const QrScanner = dynamic(() => import("react-qr-scanner"), { ssr: false });

const QrScannerModal = ({
  showQrScannerModal,
  setShowQrScannerModal,
}: {
  showQrScannerModal: boolean;
  setShowQrScannerModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [result, setResult] = useState("");
  const router = useRouter();
  const handleScan = (data) => {
    if (data) {
      const parsedData = JSON.parse(data.text);
      setResult(parsedData);
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <Modal showModal={showQrScannerModal} setShowModal={setShowQrScannerModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <Image
            src={logo}
            alt="Logo"
            className="h-10 w-10 rounded-full"
            width={20}
            height={20}
          />
          <h3 className="font-display text-2xl font-bold">Scan QR Code</h3>
          <p className="text-sm text-gray-500">
            With our cutting-edge technology, you can be sure that the
            vegetables you&apos;re consuming are fresh, safe, and from a trusted
            source.
          </p>
        </div>

        <form
          className="grid gap-6 bg-gray-50 px-4 py-8 md:px-16"
          onSubmit={async (e) => {
            e.preventDefault();
            // handle form submit here
          }}
        >
          <div className="flex items-center justify-between">
            <p className="block text-sm font-medium text-gray-700">QR code</p>
          </div>
          <QrScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: "100%", maxWidth: "400px" }}
          />
          {result && (
            <div className="mx-auto max-w-xl">
              <motion.div
                className="rounded-lg bg-white p-4 text-center shadow-md"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold">Scanned Result:</h2>
                <div className="mt-4">
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={handleToggle}
                  >
                    {isOpen ? "Hide Details" : "Show Details"}
                  </button>
                </div>
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    height: isOpen ? "auto" : 0,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-gray-700">{`ID: ${result.id}`}</p>
                  <p className="text-gray-700">{`Vegetable Type: ${result.vegetableType}`}</p>
                  <p className="text-gray-700">{`Harvest Date: ${new Date(
                    result.harvestDate
                  ).toLocaleDateString()}`}</p>
                  <p className="text-gray-700">{`Location: ${result.location}`}</p>
                  <p className="text-gray-700">{`Production Practice: ${result.productionPractice}`}</p>
                </motion.div>
              </motion.div>
            </div>
          )}

          {/* Add hidden input with tabindex -1 for focus-trap */}
          <div className="mt-1 flex rounded-md shadow-sm">
            <input type="hidden" tabIndex={-1} />
          </div>
          <button></button>
        </form>
      </div>
    </Modal>
  );
};

export function useQrScannerModal() {
  const [showQrScannerModal, setShowQrScannerModal] = useState(false);

  const QrScannerModalCallback = useCallback(() => {
    return (
      <QrScannerModal
        showQrScannerModal={showQrScannerModal}
        setShowQrScannerModal={setShowQrScannerModal}
      />
    );
  }, [showQrScannerModal, setShowQrScannerModal]);

  return useMemo(
    () => ({ setShowQrScannerModal, QrScannerModal: QrScannerModalCallback }),
    [setShowQrScannerModal, QrScannerModalCallback]
  );
}
