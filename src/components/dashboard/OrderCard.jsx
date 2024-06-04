const OrderCard = ({ property }) => {
  const {
    title,
    location,
    agentName,
    offeredAmount,
    buyerEmail,
    buyerName,
    buyingDate,
    status,
  } = property;
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="border border-gray-400 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{location}</p>
          <p className="text-gray-700 text-base">Agent: {agentName}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              Offered Amount: ${offeredAmount}
            </p>
            <p className="text-gray-600">Buyer Email: {buyerEmail}</p>
            <p className="text-gray-600">Buyer Name: {buyerName}</p>
            <p className="text-gray-600">
              Buying Date: {new Date(buyingDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Status: {status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
