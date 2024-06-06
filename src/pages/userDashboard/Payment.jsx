import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useSecureCRUD from "../../hooks/useSecureCRUD";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  const { id } = useParams();
  const { getDoc } = useSecureCRUD();
  const axiosSecure = useAxiosSecure();
  // getting order
  const { data: order = null } = useQuery({
    queryKey: ["order"],
    queryFn: async () => await getDoc(`/offers/${id}`),
  });

  // getting paymentIntent from stripe through server
  const {
    data: paymentIntent = {},
    isLoading,
    isPending,
    error,
  } = useQuery({
    queryKey: ["paymentIntent"],
    queryFn: async () =>
      await axiosSecure.post("/payments/clientsecret", {
        price: order.offered_amount,
      }),
    enabled: !!order,
  });

  if (isPending) return <p>Pending...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something wrong, cannot proceed payment</p>;

  return (
    <div>
      {paymentIntent?.data.clientSecret && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            clientSecret={paymentIntent.data.clientSecret}
            order={order}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
