import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Will be used when implementing auth functionality
// import { useAuth } from '../../hooks/useAuth';

interface TeacherProfile {
  firstName: string;
  lastName: string;
  phone: string;
  qualifications: string[];
  subjects: string[];
  availability: string[];
  location: string;
  bio: string;
}

const TeacherOnboarding: React.FC = () => {
  const navigate = useNavigate();
  // const { user } = useAuth(); // Will be used when implementing user profile management
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<TeacherProfile>({
    firstName: '',
    lastName: '',
    phone: '',
    qualifications: [],
    subjects: [],
    availability: [],
    location: '',
    bio: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement profile update logic with Supabase
      navigate('/teacher/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="First Name"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
            <button
              onClick={() => setStep(2)}
              className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500"
            >
              Next
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-yellow-400 mb-2">Qualifications</label>
              <input
                type="text"
                placeholder="Add your qualifications"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    if (input.value.trim()) {
                      setProfile({
                        ...profile,
                        qualifications: [...profile.qualifications, input.value.trim()]
                      });
                      input.value = '';
                    }
                  }
                }}
                className="w-full p-3 rounded bg-gray-700 text-white"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.qualifications.map((qual, index) => (
                  <span
                    key={index}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {qual}
                    <button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          qualifications: profile.qualifications.filter((_, i) => i !== index)
                        });
                      }}
                      className="ml-2 text-black"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500"
            >
              Next
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <textarea
              placeholder="Tell us about yourself"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white h-32 resize-none"
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full p-3 rounded bg-gray-700 text-white"
              required
            />
            <button
              onClick={handleSubmit}
              className={`w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Completing Setup...' : 'Complete Setup'}
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
              disabled={isLoading}
            >
              Back
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="bg-black text-yellow-400 p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
        <div className="mb-8 flex justify-center space-x-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full ${
                s === step ? 'bg-yellow-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default TeacherOnboarding;
