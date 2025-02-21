import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-red-500 text-6xl mb-4">✕</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 mb-8">
          Your payment was not completed. You can safely return to our website to try again.
        </p>
        <div className="flex flex-col space-y-4">
          <Link
            to="/cart"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Return to Cart
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;