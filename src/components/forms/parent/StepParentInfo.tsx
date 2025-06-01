import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EmailInput } from "../../common/EmailInput";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  phoneNumber: yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format"),
  emailAddress: yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  residentialAddress: yup.string().optional(),
  stateOfResidence: yup.string().required("State is required"),
  relationshipToStudent: yup.string().required("Relationship to student is required"),
});

interface StepParentInfoProps {
  formData: {
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    residentialAddress: string;
    stateOfResidence: string;
    relationshipToStudent: string;
  };
  updateFormData: (field: keyof StepParentInfoProps['formData'], value: string) => void;
  onNext: () => void;
}

const StepParentInfo: React.FC<StepParentInfoProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [emailValidationState, setEmailValidationState] = useState({ isValid: true, isDuplicate: false });
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const watchedEmailAddress = watch("emailAddress");

  const handleEmailValidation = (isValid: boolean, isDuplicate: boolean) => {
    setEmailValidationState({ isValid, isDuplicate });
  };

  const handleFormSubmit = (data: any) => {
    // Check email validation before proceeding
    if (!emailValidationState.isValid || emailValidationState.isDuplicate) {
      console.log('❌ Cannot proceed: Email validation failed');
      return;
    }

    Object.entries(data).forEach(([key, value]) => {
      updateFormData(key as keyof StepParentInfoProps['formData'], value);
    });
    onNext();
  };
  return (
    <motion.form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Enter your full name"
          />          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register("phoneNumber")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
            placeholder="Enter your phone number"
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.phoneNumber.message}</p>
          )}
        </div>        <div>
          <EmailInput
            value={watchedEmailAddress || ""}
            onChange={(value) => {
              setValue("emailAddress", value);
              updateFormData("emailAddress", value);
            }}
            onValidationChange={handleEmailValidation}
            formType="parent"
            id="emailAddress"
            name="emailAddress"
            required
            error={errors.emailAddress?.message}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-black mb-2" htmlFor="stateOfResidence">
            State of Residence
          </label>          <select
            id="stateOfResidence"
            {...register("stateOfResidence")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          >
            <option value="">Select state</option>
            <option value="abia">Abia</option>
            <option value="adamawa">Adamawa</option>
            <option value="akwaibom">Akwa Ibom</option>
            <option value="anambra">Anambra</option>
            <option value="bauchi">Bauchi</option>
            <option value="bayelsa">Bayelsa</option>
            <option value="benue">Benue</option>
            <option value="borno">Borno</option>
            <option value="crossriver">Cross River</option>
            <option value="delta">Delta</option>
            <option value="ebonyi">Ebonyi</option>
            <option value="edo">Edo</option>
            <option value="ekiti">Ekiti</option>
            <option value="enugu">Enugu</option>
            <option value="fct">Federal Capital Territory</option>
            <option value="gombe">Gombe</option>
            <option value="imo">Imo</option>
            <option value="jigawa">Jigawa</option>
            <option value="kaduna">Kaduna</option>
            <option value="kano">Kano</option>
            <option value="katsina">Katsina</option>
            <option value="kebbi">Kebbi</option>
            <option value="kogi">Kogi</option>
            <option value="kwara">Kwara</option>
            <option value="lagos">Lagos</option>
            <option value="nasarawa">Nasarawa</option>
            <option value="niger">Niger</option>
            <option value="ogun">Ogun</option>
            <option value="ondo">Ondo</option>
            <option value="osun">Osun</option>
            <option value="oyo">Oyo</option>
            <option value="plateau">Plateau</option>
            <option value="rivers">Rivers</option>
            <option value="sokoto">Sokoto</option>
            <option value="taraba">Taraba</option>
            <option value="yobe">Yobe</option>
            <option value="zamfara">Zamfara</option>
          </select>
          {errors.stateOfResidence && (
            <p className="mt-1 text-sm text-red-600">{errors.stateOfResidence.message}</p>
          )}
        </div>
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="residentialAddress">
          Residential Address (Optional)
        </label>
        <textarea
          id="residentialAddress"
          {...register("residentialAddress")}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          placeholder="Enter your residential address"
        />
        {errors.residentialAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.residentialAddress.message}</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-semibold text-black mb-2" htmlFor="relationshipToStudent">
          Relationship to Student
        </label>
        <input
          type="text"
          id="relationshipToStudent"
          {...register("relationshipToStudent")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent transition-all duration-200"
          placeholder="e.g. Parent, Guardian, Uncle, etc."
        />
        {errors.relationshipToStudent && (
          <p className="mt-1 text-sm text-red-600">{errors.relationshipToStudent.message}</p>
        )}
      </div>      <div className="flex justify-end pt-6">
        <button
          type="submit"
          disabled={!emailValidationState.isValid || emailValidationState.isDuplicate}
          className={`px-6 py-2 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            !emailValidationState.isValid || emailValidationState.isDuplicate
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#FFC107] text-black hover:bg-[#FFD700] focus:ring-[#FFC107]'
          }`}
        >
          Next Step
        </button>
      </div>
    </motion.form>
  );
};

export default StepParentInfo;
