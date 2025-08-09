import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Pencil } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
              <p className="text-sm text-gray-500">Welcome back to StyleNest</p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 text-white text-sm rounded-lg shadow-sm transition"
            onClick={() => console.log('Open edit profile modal')}
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-100" />

        {/* Profile Details */}
        <div className="grid gap-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Mail className="w-5 h-5 text-rose-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-base">{user.email || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <Phone className="w-5 h-5 text-rose-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-base">{user.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-700">
            <MapPin className="w-5 h-5 text-rose-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Address</p>
              <p className="text-base">{user.address || 'No address available'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
