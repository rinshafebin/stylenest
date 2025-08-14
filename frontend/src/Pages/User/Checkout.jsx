import { User, Phone, MapPin, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { useState, useEffect } from 'react';

export default function Checkout() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateField, setStateField] = useState('');
  const [city, setCity] = useState('');
  const [houseName, setHouseName] = useState('');
  const [building, setBuilding] = useState('');
  const [country, setCountry] = useState('India');

  // Other state
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch existing shipping address if available
  useEffect(() => {
    axiosInstance.get('/orders/shipping/')
      .then(res => {
        const addr = res.data;
        setName(addr.name || '');
        setPhone(addr.phone || '');
        setPincode(addr.pincode || '');
        setStateField(addr.state || '');
        setCity(addr.city || '');
        setCountry(addr.country || 'India');

        if (addr.address) {
          const [house, buildingPart] = addr.address.split(',');
          setHouseName(house?.trim() || '');
          setBuilding(buildingPart?.trim() || '');
        }
      })
      .catch(err => {
        if (err.response?.status !== 404) {
          console.error('Error fetching address:', err);
        }
      });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const shippingData = {
      name,
      phone,
      pincode,
      state: stateField,
      city,
      address: `${houseName}, ${building}`,
      country
    };

    try {
      await axiosInstance.patch('/orders/shipping/', shippingData);
      navigate('/ordersummary');
    } catch (err) {
      if (err.response?.status === 404) {
        try {
          await axiosInstance.post('/orders/shipping/', shippingData);
          navigate('/ordersummary');
        } catch (postErr) {
          if (postErr.response?.data?.errors) {
            setErrors(postErr.response.data.errors);
          } else {
            setErrors({ general: 'Failed to submit address. Please try again.' });
          }
        }
      } else if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Failed to submit address. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow flex justify-center items-center py-12 px-4">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-5">
            <button
              onClick={() => navigate(-1)}
              className="text-sm mb-2 flex items-center gap-1 opacity-90 hover:opacity-100"
            >
              ← Back to Cart
            </button>
            <h2 className="text-xl font-bold">Shipping Address</h2>
            <p className="text-sm opacity-90">Where should we deliver your order?</p>
          </div>

          {/* Form */}
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            {/* Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <User className="text-rose-500 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full focus:outline-none"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="w-full">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <Phone className="text-rose-500 mr-2" size={18} />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full focus:outline-none"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
                {errors?.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
            </div>

            {/* Pincode, State, City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="w-full">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <MapPin className="text-rose-500 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="w-full focus:outline-none"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                  />
                </div>
                {errors?.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
              </div>
              <div className="w-full">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <MapPin className="text-rose-500 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full focus:outline-none"
                    value={stateField}
                    onChange={e => setStateField(e.target.value)}
                  />
                </div>
                {errors?.state && <p className="text-red-500 text-sm">{errors.state}</p>}
              </div>
              <div className="w-full">
                <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                  <MapPin className="text-rose-500 mr-2" size={18} />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full focus:outline-none"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
                {errors?.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>
            </div>

            {/* House Name */}
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Home className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="House name"
                  className="w-full focus:outline-none"
                  value={houseName}
                  onChange={e => setHouseName(e.target.value)}
                />
              </div>
              {errors?.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            {/* Building / Street */}
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Building / Street"
                  className="w-full focus:outline-none"
                  value={building}
                  onChange={e => setBuilding(e.target.value)}
                />
              </div>
            </div>

            {/* Country */}
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <MapPin className="text-rose-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full focus:outline-none"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              </div>
              {errors?.country && <p className="text-red-500 text-sm">{errors.country}</p>}
            </div>

            {/* General error */}
            {errors?.general && <p className="text-red-500 text-sm">{errors.general}</p>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Continue to Payment →'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
