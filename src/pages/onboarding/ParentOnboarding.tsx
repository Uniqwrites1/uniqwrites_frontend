import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Will be used when implementing auth functionality
// import { useAuth } from '../../hooks/useAuth';

interface ParentProfile {
  firstName: string;
  lastName: string;
  phone: string;
  children: Array<{
    name: string;
    grade: string;
    subjects: string[];
  }>;
  location: string;
}

const ParentOnboarding: React.FC = () => {
  const navigate = useNavigate();
  // Current user data will be needed when implementing profile submission
  // const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<ParentProfile>({
    firstName: '',
    lastName: '',
    phone: '',
    children: [{
      name: '',
      grade: '',
      subjects: []
    }],
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement profile update logic with Supabase
      navigate('/parent/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addChild = () => {
    setProfile({
      ...profile,
      children: [
        ...profile.children,
        { name: '', grade: '', subjects: [] }
      ]
    });
  };

  const updateChild = (index: number, field: keyof typeof profile.children[0], value: string) => {
    const updatedChildren = [...profile.children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      [field]: value
    };
    setProfile({ ...profile, children: updatedChildren });
  };

  const removeChild = (index: number) => {
    setProfile({
      ...profile,
      children: profile.children.filter((_, i) => i !== index)
    });
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
            <div className="space-y-6">
              {profile.children.map((child, index) => (
                <div key={index} className="p-4 bg-gray-800 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-yellow-400">Child {index + 1}</h3>
                    {index > 0 && (
                      <button
                        onClick={() => removeChild(index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Child's Name"
                    value={child.name}
                    onChange={(e) => updateChild(index, 'name', e.target.value)}
                    className="w-full p-3 rounded bg-gray-700 text-white"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Grade/Class"
                    value={child.grade}
                    onChange={(e) => updateChild(index, 'grade', e.target.value)}
                    className="w-full p-3 rounded bg-gray-700 text-white"
                    required
                  />
                </div>
              ))}
            </div>
            <button
              onClick={addChild}
              className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600"
            >
              Add Another Child
            </button>
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

export default ParentOnboarding;
