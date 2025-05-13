import React from 'react';

interface StepSpecialNeedsProps {
  formData: { specialNeeds: string };
  updateFormData: (field: string, value: unknown) => void;
  onPrevious: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const StepSpecialNeeds: React.FC<StepSpecialNeedsProps> = ({
  formData,
  updateFormData,
  onPrevious,
  onSubmit,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Special Needs/Notes</label>
        <textarea
          name="specialNeeds"
          value={formData.specialNeeds}
          onChange={handleChange}
          className="mt-1 block w-full border rounded px-3 py-2"
          rows={6}
          placeholder="Please provide any additional information about special needs, learning disabilities, or other important notes that would help us match you with the right tutor."
        />
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="text-violet-600 border border-violet-600 px-6 py-2 rounded hover:bg-violet-50"
        >
          previous
        </button>
        <button
          type="submit"
          className="bg-violet-600 text-white px-6 py-2 rounded hover:bg-violet-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default StepSpecialNeeds;

