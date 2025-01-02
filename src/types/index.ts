export interface Profile {
  id: string;
  username: string;
  role: 'student';
  rating: number;
  total_ratings: number;
  created_at: string;
  whatsapp_number?: string;
  is_outside_campus?: boolean;
  last_status_update?: string;
  email: string;
}

export interface DeliveryRequest {
  id: string;
  student_id: string;
  title: string;
  details: string;
  location: string;
  deadline: string;
  status: 'open' | 'assigned' | 'completed';
  created_at: string;
  assigned_to?: string;
  payment_amount?: number;
  student?: Profile;
}

export interface Bid {
  id: string;
  request_id: string;
  volunteer_id: string;
  amount: number;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
  volunteer?: Profile;
}