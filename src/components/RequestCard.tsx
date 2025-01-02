import React from 'react';
import { Clock, MapPin, Phone, IndianRupee } from 'lucide-react';
import type { DeliveryRequest, Profile } from '../types';
import StatusBadge from './StatusBadge';

interface RequestCardProps {
  request: DeliveryRequest;
  profile: Profile;
  onAcceptRequest?: (requestId: string) => void;
}

export default function RequestCard({ 
  request,
  profile,
  onAcceptRequest
}: RequestCardProps) {
  const isOwner = request.student_id === profile?.id;
  const deadline = new Date(request.deadline);
  const isExpired = deadline < new Date();

  const getWhatsAppLink = (number: string) => {
    const cleanNumber = number.replace(/\D/g, '');
    return `https://wa.me/${cleanNumber}`;
  };

  const canAcceptRequest = !isOwner && 
    request.status === 'open' && 
    !isExpired && 
    onAcceptRequest;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{request.title}</h3>
          {request.student && (
            <div className="mt-1">
              <StatusBadge 
                isOutsideCampus={request.student.is_outside_campus || false}
                lastUpdate={request.student.last_status_update}
              />
            </div>
          )}
        </div>
        {request.payment_amount && (
          <div className="flex items-center space-x-1 bg-green-100 px-3 py-1 rounded-full">
            <IndianRupee className="h-4 w-4 text-green-700" />
            <span className="text-green-700 font-medium">{request.payment_amount}</span>
          </div>
        )}
      </div>

      <p className="text-gray-600 mb-4">{request.details}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{request.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-5 w-5 mr-2" />
          <span>{deadline.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {request.student?.whatsapp_number && request.status === 'assigned' && (
          <a
            href={getWhatsAppLink(request.student.whatsapp_number)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-green-600 hover:text-green-700"
          >
            <Phone className="h-5 w-5" />
            <span>Contact</span>
          </a>
        )}
        
        {canAcceptRequest && (
          <button
            onClick={() => onAcceptRequest(request.id)}
            className="flex-1 ml-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Help with Delivery
          </button>
        )}
      </div>

      {isExpired && (
        <p className="text-red-600 text-sm mt-2">This request has expired</p>
      )}
    </div>
  );
}