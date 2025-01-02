import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import ProfileSettings from '../components/ProfileSettings';
import StatusBadge from '../components/StatusBadge';
import toast from 'react-hot-toast';

export default function Profile() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg">{profile.username}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-lg capitalize">{profile.role}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1">
                <StatusBadge 
                  isOutsideCampus={profile.is_outside_campus || false}
                  lastUpdate={profile.last_status_update}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-lg">
                {new Date(profile.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
            <ProfileSettings 
              profileId={profile.id}
              whatsappNumber={profile.whatsapp_number}
              isOutsideCampus={profile.is_outside_campus}
            />
          </div>
        </div>
      </div>
    </div>
  );
}