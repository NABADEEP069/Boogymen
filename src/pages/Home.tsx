import { Link } from 'react-router-dom';
import { Package2, TrendingDown, Shield } from 'lucide-react';
import OutsideStudentsList from '../components/OutsideStudentsList';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Campus Delivery Made Easy
        </h1>
        <p className="text-xl text-gray-600">
        Boogymen is a seamless solution for hostel students to get food from outside the campus. Students outside can update their status, and others can post requests. With options to accept requests or bid for deliveries, Boogymen connects the campus like never before!

        </p>
      </div>

      <OutsideStudentsList />

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Package2 className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Post Requests</h3>
          <p className="text-gray-600">
            Create delivery requests for items you need from outside campus
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <TrendingDown className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Help Others</h3>
          <p className="text-gray-600">
            Going outside? Help fellow students by accepting their delivery requests
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <Shield className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Alcohol Please !</h3>
          <p className="text-gray-600">
            Connect with your campus community in a  trusted environment
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link
          to="/auth"
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 inline-block"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}