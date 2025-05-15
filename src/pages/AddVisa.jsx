import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import {
  Button,
  Checkbox,
  Label,
  Select,
  Textarea,
  TextInput,
  Spinner,
  Alert,
} from "flowbite-react";
import {
  FaUpload,
  FaGlobe,
  FaUserTie,
  FaUserGraduate,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { MdDescription, MdPayments, MdAccessTime } from "react-icons/md";

const AddVisa = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const visaTypes = [
    { value: "Work Visa", icon: <FaUserTie className="mr-2" /> },
    { value: "Student Visa", icon: <FaUserGraduate className="mr-2" /> },
    { value: "Tourist Visa", icon: <FaUmbrellaBeach className="mr-2" /> },
    { value: "Immigrant Visa", icon: <FaGlobe className="mr-2" /> },
  ];

  const documentOptions = [
    "Valid passport",
    "Visa application form",
    "Recent passport-sized photograph",
    "Proof of accommodation",
    "Travel itinerary",
    "Financial statements",
    "Letter of invitation",
    "Health insurance",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const visaData = {
        ...data,
        addedBy: user.email,
        // Convert documents to array if they're not already
        required_documents: Array.isArray(data.required_documents)
          ? data.required_documents
          : [data.required_documents].filter(Boolean),
      };

      const response = await fetch(
        "https://visa-master-server.vercel.app/visas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(visaData),
        }
      );

      if (!response.ok) throw new Error("Failed to add visa");

      const result = await response.json();
      if (result.acknowledged) {
        reset();
        setImagePreview(null);
        toast.success("Visa added successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add visa");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white">Add New Visa</h1>
            <p className="text-blue-100 mt-2">
              Fill in the details below to add a new visa option
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Country Image */}
              <div>
                <Label htmlFor="country_image" value="Country Image" />
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="w-full md:w-1/2">
                    <TextInput
                      {...register("country_image", {
                        required: "Image URL is required",
                      })}
                      id="country_image"
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      color={errors.country_image ? "failure" : "gray"}
                      helperText={errors.country_image?.message}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      OR
                    </p>
                    <div className="mt-2">
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center"
                      >
                        <FaUpload className="mr-2" />
                        Upload Image
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </Label>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 flex justify-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="h-32 w-full bg-gray-100 dark:bg-gray-700 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">
                          Image Preview
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Country Name */}
              <div>
                <Label htmlFor="country_name" value="Country Name" />
                <TextInput
                  {...register("country_name", {
                    required: "Country name is required",
                  })}
                  id="country_name"
                  type="text"
                  placeholder="e.g., United States"
                  icon={FaGlobe}
                  color={errors.country_name ? "failure" : "gray"}
                  helperText={errors.country_name?.message}
                />
              </div>

              {/* Visa Type */}
              <div>
                <Label htmlFor="visa_type" value="Visa Type" />
                <Select
                  {...register("visa_type", {
                    required: "Visa type is required",
                  })}
                  id="visa_type"
                  color={errors.visa_type ? "failure" : "gray"}
                  helperText={errors.visa_type?.message}
                >
                  {visaTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon}
                      {type.value}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Processing Time */}
              <div>
                <Label htmlFor="proccessing_time" value="Processing Time" />
                <TextInput
                  {...register("proccessing_time", {
                    required: "Processing time is required",
                  })}
                  id="proccessing_time"
                  type="text"
                  placeholder="e.g., 15 business days"
                  icon={MdAccessTime}
                  color={errors.proccessing_time ? "failure" : "gray"}
                  helperText={errors.proccessing_time?.message}
                />
              </div>

              {/* Required Documents */}
              <div>
                <Label value="Required Documents" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {documentOptions.map((doc) => (
                    <div key={doc} className="flex items-center">
                      <Checkbox
                        {...register("required_documents")}
                        id={doc.replace(/\s+/g, "-")}
                        value={doc}
                      />
                      <Label
                        htmlFor={doc.replace(/\s+/g, "-")}
                        className="ml-2"
                      >
                        {doc}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" value="Description" />
                <Textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 50,
                      message: "Description should be at least 50 characters",
                    },
                  })}
                  id="description"
                  placeholder="Provide detailed description about the visa..."
                  rows={5}
                  icon={MdDescription}
                  color={errors.description ? "failure" : "gray"}
                  helperText={errors.description?.message}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Age Restriction */}
                <div>
                  <Label htmlFor="age_restriction" value="Age Restriction" />
                  <TextInput
                    {...register("age_restriction", {
                      required: "Age restriction is required",
                      min: {
                        value: 0,
                        message: "Age must be positive",
                      },
                    })}
                    id="age_restriction"
                    type="number"
                    placeholder="Minimum age"
                    color={errors.age_restriction ? "failure" : "gray"}
                    helperText={errors.age_restriction?.message}
                  />
                </div>

                {/* Fee */}
                <div>
                  <Label htmlFor="fee" value="Fee (USD)" />
                  <TextInput
                    {...register("fee", {
                      required: "Fee is required",
                      min: {
                        value: 0,
                        message: "Fee must be positive",
                      },
                    })}
                    id="fee"
                    type="number"
                    placeholder="Visa fee amount"
                    icon={MdPayments}
                    color={errors.fee ? "failure" : "gray"}
                    helperText={errors.fee?.message}
                  />
                </div>

                {/* Validity */}
                <div>
                  <Label htmlFor="validity" value="Validity (months)" />
                  <TextInput
                    {...register("validity", {
                      required: "Validity is required",
                      min: {
                        value: 1,
                        message: "Validity must be at least 1 month",
                      },
                    })}
                    id="validity"
                    type="number"
                    placeholder="Duration in months"
                    color={errors.validity ? "failure" : "gray"}
                    helperText={errors.validity?.message}
                  />
                </div>
              </div>

              {/* Application Method */}
              <div>
                <Label
                  htmlFor="application_method"
                  value="Application Method"
                />
                <Select
                  {...register("application_method", {
                    required: "Application method is required",
                  })}
                  id="application_method"
                  color={errors.application_method ? "failure" : "gray"}
                  helperText={errors.application_method?.message}
                >
                  <option value="">Select method</option>
                  <option value="Online">Online Application</option>
                  <option value="Offline">In-Person Application</option>
                  <option value="Both">Both Online and Offline</option>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  gradientDuoTone="purpleToBlue"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Adding Visa...
                    </>
                  ) : (
                    "Add Visa"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddVisa;
