import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useSecureCRUD from "../../hooks/useSecureCRUD";

const CheckoutForm = ({ order, clientSecret }) => {
  // console.log(order);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axioSecure = useAxiosSecure();
  const { savedUser } = useAuth();
  const [transectionId, setTransectionId] = useState(null);
  const { updateDoc } = useSecureCRUD();
  const [isLoading, setIsloading] = useState(false);

  // handling payment
  async function handlePayment(e) {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    setIsloading(true);
    // making payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment method error", error);
      setError(error.message);
      setIsloading(false);
    } else {
      setError("");
      console.log("payment method ok ", paymentMethod);
    }

    // confirm payment
    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: savedUser?.email || "unknown",
            name: savedUser?.displayName || "unknown",
          },
        },
      });
    // checking payment confirmation and saving payment info and updating offerr/orders status
    if (confirmError) {
      console.log("payment confirmation error ", confirmError);
      setError(confirmError.message);
      setIsloading(false);
    } else {
      setError("");
      console.log(" paymentIntent confirmed here", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        await saveOrder(paymentIntent.id);
        await updateStatus();
        setIsloading(false);
        setTransectionId(paymentIntent.id);
        toast.success("Payment is succeeded");
        // navigate("/userdashboard/orders");
      }
    }
  }

  // saving payment info
  async function saveOrder(id) {
    const paymentInfo = {
      email: savedUser.email,
      price: order.offered_amount,
      transectionId: id,
      date: new Date(),
    };
    await axioSecure.post("/payments/savepayment", paymentInfo);
  }
  // updating status to paid
  async function updateStatus() {
    const updatedDoc = {
      status: "paid",
    };
    await updateDoc(`/offers/${order._id}`, updatedDoc);
  }
  return (
    <div className=" mx-10 bg-base-200 p-5 ">
      <form onSubmit={handlePayment}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "14px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="mt-10 grid place-content-center">
          {!transectionId && (
            <button
              disabled={!stripe || !clientSecret}
              type="submit"
              className="btn btn-sm md:btn-md  btn-outline w-full btn-warning text-white font-light"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Make payment"
              )}
            </button>
          )}
          <p className="text-red-500 mt-2">{error}</p>
          {transectionId && (
            <p className="text-green-500 mt-2">ID: {transectionId}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
