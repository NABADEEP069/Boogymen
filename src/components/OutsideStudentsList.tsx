import React from 'react';
import { MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types';

export default function OutsideStudentsList() {
  const [outsideStudents, setOutsideStudents] = React.useState<Profile[]>([]);

  React.useEffect(() => {
    fetchOutsideStudents();
    const subscription = supabase
      .channel('outside_students')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'profiles' 
      }, () => {
        fetchOutsideStudents();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchOutsideStudents() {
    const { data } = await supabase
      .from('profiles')
      .select('id, username, whatsapp_number')
      .eq('is_outside_campus', true)
      .order('last_status_update', { ascending: false });
    
    setOutsideStudents(data || []);
  }

  if (outsideStudents.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex items-center space-x-2 mb-4">
        <MapPin className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold">Students Currently Outside Campus</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {outsideStudents.map(student => (
          <div key={student.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-md">
            <div>
              <p className="font-medium">{student.username}</p>
              {student.whatsapp_number && (
                <a
                  href={`https://wa.me/${student.whatsapp_number.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Contact on WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}