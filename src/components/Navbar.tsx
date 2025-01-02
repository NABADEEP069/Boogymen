import React from 'react';
import { Link } from 'react-router-dom';
import { Package2, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Package2 className="h-6 w-6 text-indigo-600" />
            <span className="font-bold text-xl">Boogymen</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/requests" className="text-gray-700 hover:text-indigo-600">
              Requests
            </Link>
            {user ? (
              <>
                <Link to="/create-request" className="text-gray-700 hover:text-indigo-600">
                  Create Request
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
                  <User className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}