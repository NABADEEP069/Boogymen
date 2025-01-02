import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import RequestCard from '../components/RequestCard';
import toast from 'react-hot-toast';
import type { DeliveryRequest } from '../types';

export default function Requests() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = React.useState<DeliveryRequest[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchRequests();
    const subscription = supabase
      .channel('requests_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'delivery_requests' 
      }, () => {
        fetchRequests();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchRequests() {
    try {
      const { data: requests, error } = await supabase
        .from('delivery_requests')
        .select(`
          *,
          student:profiles!delivery_requests_student_id_fkey (
            id,
            username,
            email,
            whatsapp_number,
            is_outside_campus,
            last_status_update
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(requests || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch requests');
    }
  }

  const handleAcceptRequest = async (requestId: string) => {
    if (!profile) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('delivery_requests')
        .update({ 
          status: 'assigned',
          assigned_to: profile.id
        })
        .eq('id', requestId);

      if (error) throw error;
      toast.success('Request accepted!');
      fetchRequests();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to accept request');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Please sign in to view requests.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Delivery Requests</h2>
        {profile.role === 'student' && (
          <button
            onClick={() => navigate('/create-request')}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            <span>New Request</span>
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {requests.map(request => (
          <RequestCard
            key={request.id}
            request={request}
            profile={profile}
            onAcceptRequest={!loading && request.student_id !== profile.id ? handleAcceptRequest : undefined}
          />
        ))}
      </div>
    </div>
  );
}