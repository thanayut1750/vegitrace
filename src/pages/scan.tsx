import { useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function Scan() {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <Head>
        <title>QR Code Scanner</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Scan QR Code</h1>
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          style={{ width: '100%', maxWidth: '400px' }}
        />
        {result && (
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold">Scanned Result:</h2>
            <p className="mt-4 text-gray-700">{result}</p>
          </div>
        )}
      </div>
    </>
  );
}
