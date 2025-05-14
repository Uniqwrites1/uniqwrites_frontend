import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  students: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      age: yup.number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .nullable(),
      currentClass: yup.string(),
      peculiarity: yup.string().optional()
    })
  )
});

interface Student {
  name: string;
  age: number;
  currentClass: string;
  peculiarity: string;
}

interface StepStudentInfoProps {
  formData: { students: Student[] };
  updateFormData: (field: string, value: Student[]) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StepStudentInfo: React.FC<StepStudentInfoProps> = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const { handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { students: formData.students }
  });

  const addStudent = () => {
    const updatedStudents = [
      ...formData.students,
      { name: "", age: 0, currentClass: "", peculiarity: "" }
    ];
    updateFormData("students", updatedStudents);
  };

  const removeStudent = (index: number) => {
    if (formData.students.length > 1) {
      const updatedStudents = formData.students.filter((_, i) => i !== index);
      updateFormData("students", updatedStudents);
    }
  };

  const handleFieldChange = (index: number, field: keyof Student, value: string | number) => {
    const updatedStudents = [...formData.students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: field === 'age' ? Number(value) : value
    };
    updateFormData("students", updatedStudents);
  };
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <form onSubmit={handleSubmit(() => onNext())} className="space-y-6">
        {formData.students.map((student, index) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-md border border-gray-100">            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Student {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeStudent(index)}
                className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={formData.students.length === 1}
                aria-label={`Delete Student ${index + 1}`}
              >
                <span className="mr-1">×</span>
                Delete Student
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  value={student.name}
                  onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
                  placeholder="Enter student's name"
                />
                {errors?.students?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.students[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Age
                </label>
                <input
                  type="number"
                  value={student.age || ""}
                  onChange={(e) => handleFieldChange(index, "age", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
                  placeholder="Enter student's age"
                  min="3"
                  max="18"
                />
                {errors?.students?.[index]?.age && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.students[index]?.age?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Current Class
                </label>
                <input
                  type="text"
                  value={student.currentClass}
                  onChange={(e) => handleFieldChange(index, "currentClass", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
                  placeholder="e.g., JSS1, Primary 4"
                />
                {errors?.students?.[index]?.currentClass && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.students[index]?.currentClass?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Special Needs/Notes (Optional)
                </label>
                <textarea
                  value={student.peculiarity}
                  onChange={(e) => handleFieldChange(index, "peculiarity", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
                  placeholder="Any special needs or additional notes"
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="button"
            onClick={addStudent}
            className="text-[#FFC107] font-semibold hover:text-[#FFD700] flex items-center space-x-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            <span>Add Another Student</span>
          </button>
        </div>

        <div className="flex justify-between pt-6">
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
            Next Step
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StepStudentInfo;
