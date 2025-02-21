import { Link } from 'react-router-dom';

const BookingSuccess = () => {


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Booking Successful!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your booking. You are most welcome to visit our office for your car collection and payments.
        </p>
        <div className="flex flex-col space-y-4">
          
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

export default BookingSuccess;