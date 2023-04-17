import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import logo from '/public/images/vegetables.png'
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LoadingCircle } from "../shared/icons";

const images = [
  logo,
  logo,
  logo,
  logo,
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PhotoBooth({
  input,
  blurDataURL,
  output,
  failed,
}: {
  input: string;
  blurDataURL: string;
  output: string | null;
  failed?: boolean;
}) {
  const router = useRouter();
  const { id } = router.query;

  const [state, setState] = useState("output");
  const direction = useMemo(() => (state === "output" ? 1 : -1), [state]);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (loading) {
        setShowForm(true);
      }
    }, 5000);
  }, [loading]);

  useEffect(() => {
    if (output) {
      setLoading(false);
    }
  }, [output]);

  const handlePreviousClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <motion.div
      className="group relative mx-auto mt-10 h-[350px] w-full overflow-hidden rounded-2xl border border-gray-200 sm:h-[600px] sm:w-[600px]"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <div className="relative h-full w-full">
        {images.map((image, index) => (
          <AnimatePresence key={index}>
            {activeIndex === index && (
              <motion.div
                key={index}
                className="absolute inset-0 h-full w-full"
                initial="enter"
                animate="center"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.5 }}
                custom={direction}
              >
                <Image
                  src={image}
                  alt={`Image ${index}`}
                  layout="fill"
                  objectFit="cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        ))}
    
        <div className="absolute top-1/2 left-0 z-10 flex items-center justify-between w-full px-4">
          <button
            className="bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            onClick={handlePreviousClick}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
    
          <button
            className="bg-black text-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            onClick={handleNextClick}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
