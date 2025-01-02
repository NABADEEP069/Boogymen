import React from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ProfileSettingsProps {
  profileId: string;
  whatsappNumber?: string;
  isOutsideCampus?: boolean;
}

export default function ProfileSettings({ 
  profileId, 
  whatsappNumber: initialWhatsappNumber,
  isOutsideCampus: initialIsOutsideCampus 
}: ProfileSettingsProps) {
  const [whatsappNumber, setWhatsappNumber] = React.useState(initialWhatsappNumber || '');
  const [isOutsideCampus, setIsOutsideCampus] = React.useState(initialIsOutsideCampus || false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          whatsapp_number: whatsappNumber,
          is_outside_campus: isOutsideCampus,
          last_status_update: isOutsideCampus ? new Date().toISOString() : null
        })
        .eq('id', profileId);

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          WhatsApp Number
        </label>
        <input
          type="tel"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          placeholder="+91 1234567890"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isOutsideCampus"
          checked={isOutsideCampus}
          onChange={(e) => setIsOutsideCampus(e.target.checked)}
          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <label htmlFor="isOutsideCampus" className="text-sm font-medium text-gray-700">
          I am currently outside campus
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
}