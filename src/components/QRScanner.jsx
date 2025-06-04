// components/QRScanner.jsx
import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
    });

    scanner.render(
      (decodedText) => {
        onScanSuccess(decodedText);
        scanner.clear();
      },
      (errorMessage) => {
        // Optional: console.log("Scan error", errorMessage);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onScanSuccess]);

  return (
    <div
      className="font-kanit flex justify-center items-center flex-col"
      id="qr-reader"
    />
  );
};

export default QRScanner;
