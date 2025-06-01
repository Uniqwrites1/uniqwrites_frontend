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
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Upload CV (PDF, DOC, DOCX)
          <span className="text-gray-500 text-xs ml-2">(Max 5MB)</span>
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          {...register("cv")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FFC107] file:text-black hover:file:bg-[#FFD700]"
        />
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, DOC, DOCX (Maximum file size: 5MB)
        </p>
      </div>      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Upload Photo (JPG, PNG, JPEG)
          <span className="text-gray-500 text-xs ml-2">(Max 2MB)</span>
        </label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png,image/jpg"
          {...register("photo")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FFC107] file:text-black hover:file:bg-[#FFD700]"
        />
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: JPG, PNG, JPEG (Maximum file size: 2MB)
        </p>
      </div>      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Upload Certificates (PDF, JPG, PNG) 
          <span className="text-gray-500 text-xs ml-2">(Optional, Max 5MB each)</span>
        </label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png,image/jpg"
          multiple
          {...register("certificates")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        <p className="mt-1 text-xs text-gray-500">
          You can upload multiple certificate files. Supported formats: PDF, JPG, PNG
        </p>
      </div><div className="flex justify-between pt-6">
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

