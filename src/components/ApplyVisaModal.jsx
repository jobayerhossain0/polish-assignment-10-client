import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useForm } from "react-hook-form";
import {
  Button,
  Datepicker,
  Label,
  Modal,
  TextInput,
  Spinner,
  Alert,
} from "flowbite-react";
import {
  FaUser,
  FaEnvelope,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaPassport,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { HiOutlineDocumentText } from "react-icons/hi";

const ApplyVisaModal = ({ openModal, setOpenModal, visa }) => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const application = {
        ...data,
        visaInfo: visa,
        applicantId: user.uid,
        status: "pending", // Default status
        appliedDate: new Date().toISOString(),
      };

      const response = await fetch(
        "https://visa-master-server.vercel.app/visa-applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(application),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      if (result.acknowledged) {
        reset();
        setOpenModal(false);
        toast.success("Application submitted successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to submit application");
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)} size="lg">
      <Modal.Header className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <FaPassport className="mr-2 text-blue-600" />
          <span className="text-xl font-semibold">
            Apply for {visa?.country_name} {visa?.visa_type}
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Applicant Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                id="email"
                type="email"
                placeholder="your@email.com"
                icon={FaEnvelope}
                defaultValue={user?.email}
                color={errors.email ? "failure" : "gray"}
                helperText={errors.email?.message}
                disabled
              />
            </div>
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
                placeholder="Application fee"
                icon={FaMoneyBillWave}
                defaultValue={visa?.fee}
                color={errors.fee ? "failure" : "gray"}
                helperText={errors.fee?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters",
                  },
                })}
                id="firstName"
                type="text"
                placeholder="John"
                icon={FaUser}
                color={errors.firstName ? "failure" : "gray"}
                helperText={errors.firstName?.message}
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Minimum 2 characters",
                  },
                })}
                id="lastName"
                type="text"
                placeholder="Doe"
                icon={FaUser}
                color={errors.lastName ? "failure" : "gray"}
                helperText={errors.lastName?.message}
              />
            </div>
          </div>

          {/* Travel Information */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="flex items-center text-lg font-medium text-gray-900 dark:text-white mb-4">
              <HiOutlineDocumentText className="mr-2" />
              Travel Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passportNumber" value="Passport Number" />
                <TextInput
                  {...register("passportNumber", {
                    required: "Passport number is required",
                    pattern: {
                      value: /^[A-Z0-9]{6,12}$/,
                      message: "Invalid passport number format",
                    },
                  })}
                  id="passportNumber"
                  type="text"
                  placeholder="AB1234567"
                  color={errors.passportNumber ? "failure" : "gray"}
                  helperText={errors.passportNumber?.message}
                />
              </div>
              <div>
                <Label htmlFor="passportExpiry" value="Passport Expiry Date" />
                <Datepicker
                  {...register("passportExpiry", {
                    required: "Passport expiry date is required",
                    validate: (value) => {
                      const expiryDate = new Date(value);
                      const today = new Date();
                      return expiryDate > today || "Passport must be valid";
                    },
                  })}
                  id="passportExpiry"
                  minDate={new Date()}
                  color={errors.passportExpiry ? "failure" : "gray"}
                  helperText={errors.passportExpiry?.message}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              color="light"
              onClick={() => setOpenModal(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ApplyVisaModal;
