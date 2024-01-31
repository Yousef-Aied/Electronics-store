"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";
import Button from "../components/Button";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "@/hooks/useCart";
import router from "next/router";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts) {
      setLoading(true);
      setError(false);
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          if (data.paymentIntent.status !== "succeeded") {
            // Handle non-successful payment intent status here
          }
        })
        .catch((error) => {
          setError(true);
          console.error("Error processing payment:", error);
          toast.error("Something went wrong");
        });
    }
  }, [cartProducts]);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={setPaymentSuccess}
          />
        </Elements>
      )}
      {/* Render other components based on payment success, loading, and error states */}
    </div>
  );
};

export default CheckoutClient;

// "use client";

// import { useCart } from "@/hooks/useCart";
// import { Elements } from "@stripe/react-stripe-js";
// import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { toast } from "react-hot-toast";
// import CheckoutForm from "./CheckoutForm";
// import Button from "../components/Button";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

// const CheckoutClient = () => {
//   const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   const router = useRouter();

//   console.log("paymentIntent", paymentIntent);
//   console.log("clientSecret", clientSecret);

//   useEffect(() => {
//     // create a paymentintent as soon the page loads
//     if (cartProducts) {
//       setLoading(true);
//       setError(false);

//       fetch("/api/create-payment-intent", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: cartProducts,
//           payment_intent_id: paymentIntent,
//         }),
//       })
//         .then((res) => {
//           setLoading(false);
//           if (res.status === 401) {
//             return router.push("/login");
//           }
//           return res.json();
//         })
//         .then((data) => {
//           setClientSecret(data.paymentIntent.client_secret);
//           handleSetPaymentIntent(data.paymentIntent.id);
//         })
//         .catch((error) => {
//           setError(true);
//           console.log(error, "Error");
//           toast.error("Something went wrong");
//         });
//     }
//   }, [cartProducts, handleSetPaymentIntent, paymentIntent, router]);
//   //[cartProducts, paymentIntent]

//   const options: StripeElementsOptions = {
//     clientSecret,
//     appearance: {
//       theme: "stripe",
//       labels: "floating",
//     },
//   };

//   const handleSetPaymentSuccess = useCallback((value: boolean) => {
//     setPaymentSuccess(value);
//   }, []);

//   return (
//     <div className="w-full">
//       {clientSecret && cartProducts && (
//         <Elements options={options} stripe={stripePromise}>
//           <CheckoutForm
//             clientSecret={clientSecret}
//             handleSetPaymentSuccess={handleSetPaymentSuccess}
//           />
//         </Elements>
//       )}
//       {loading && <div className="text-center">Loading Checkout...</div>}
//       {error && (
//         <div className="text-center text-rose-500">Something went wrong...</div>
//       )}
//       {paymentSuccess && (
//         <div className="flex items-center flex-col gap-4">
//           <div className="text-teal-500 text-center">Payment Success</div>
//           <div className="max-w-[220px] w-full">
//             <Button
//               label="View Your Orders"
//               onClick={() => router.push("/orders")}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckoutClient;
