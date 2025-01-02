import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Package2, IndianRupee } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function CreateRequest() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    title: '',
    details: '',
    location: '',
    deadline: '',
    payment_amount: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('delivery_requests').insert({
        student_id: profile.id,
        ...formData,
        payment_amount: formData.payment_amount ? parseInt(formData.payment_amount) : null
      });

      if (error) throw error;

      toast.success('Request created successfully!');
      navigate('/requests');
    } catch (error) {
      toast.error('Failed to create request');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!profile) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Please sign in to create delivery requests.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Create Delivery Request</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              What do you need?
            </label>
            <div className="mt-1 relative">
              <Package2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g., Burger from McDonald's"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Details
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Specify your order details, preferences, etc."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Location
            </label>
            <div className="mt-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g., Room 301, Block A"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Amount (₹)
            </label>
            <div className="mt-1 relative">
              <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="payment_amount"
                value={formData.payment_amount}
                onChange={handleChange}
                min="0"
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="How much will you pay for delivery?"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Deadline
            </label>
            <div className="mt-1 relative">
              <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Request'}
          </button>
        </form>
      </div>
    </div>
  );
}