import React from "react";
import { useForm } from "react-hook-form";

interface StepUploadsProps {
  onPrevious: () => void;
  onSubmit: (event: React.FormEvent) => void;
}

const StepUploads: React.FC<StepUploadsProps> = ({
  onPrevious,
  onSubmit
}) => {
  const { register, handleSubmit } = useForm();

  const onFormSubmit = (data: any) => {
    // Handle form data collection
    console.log("Form data collected:", data);

    // Create a synthetic event to pass to the parent's onSubmit
    const syntheticEvent = {
      preventDefault: () => {},
      target: null
    } as React.FormEvent;

    onSubmit(syntheticEvent);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Upload CV (PDF, DOC)</label>
        <input
          type="file"
          accept=".pdf,.doc"
          {...register("cv")}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Upload Photo (Image files)</label>
        <input
          type="file"
          accept="image/*"
          {...register("photo")}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Upload Certificates (PDF, JPG)</label>
        <input
          type="file"
          accept=".pdf,.jpg"
          {...register("certificates")}
          className="mt-1 block w-full"
        />
      </div>      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={onPrevious}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-all duration-200 font-semibold"
        >
          Previous Step
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-[#FFC107] text-black rounded-md hover:bg-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 transition-all duration-200 font-semibold"
        >
          Submit Application
        </button>
      </div>
    </form>
  );
};

export default StepUploads;

