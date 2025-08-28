// pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { url } from "../../api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // You can check with your backend if needed
        const response = await fetch(
          `${url}verify-payment?session_id=${sessionId}`
        );
        const data = await response.json();

        if (data.success) {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  return (
    <div>
      {status === "verifying" && <p>Verifying your payment...</p>}
      {status === "success" && (
        <p>Payment successful! Your account has been upgraded.</p>
      )}
      {status === "failed" && (
        <p>Payment verification failed. Please contact support.</p>
      )}
      {status === "error" && (
        <p>Error verifying payment. Please try again later.</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
