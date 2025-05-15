import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  Button,
  Label,
  TextInput,
  Spinner,
  FileInput,
  Alert,
} from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff, HiMail, HiUser, HiPhotograph } from "react-icons/hi";

const Register = () => {
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [apiError, setApiError] = useState(null);

  const from = location.state?.from?.pathname || "/";
  const password = watch("password", "");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setApiError(null);
    try {
      // Create user
      await createUser(data.email, data.password);

      // Prepare user profile data
      const profileData = {
        displayName: data.name,
      };

      // If photo is a file, upload it first (you'll need to implement this)
      // Otherwise use the URL if provided
      if (data.photo[0] instanceof File) {
        // Implement your file upload logic here
        // profileData.photoURL = uploadedPhotoUrl;
      } else if (typeof data.photo === "string") {
        profileData.photoURL = data.photo;
      }

      // Update user profile
      await updateUser(profileData);

      navigate(from, { replace: true });
      toast.success("Registration successful!");
    } catch (err) {
      setApiError(err.message || "Registration failed");
      if (err.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "This email is already registered",
        });
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate(from, { replace: true });
      toast.success("Registration successful!");
    } catch (err) {
      setApiError(err.message || "Google registration failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Helmet>
        <title>VisaMaster | Register</title>
      </Helmet>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Create Account</h1>
            <p className="text-blue-100 mt-1">Join us today</p>
          </div>

          {/* Form */}
          <div className="p-6">
            {apiError && (
              <Alert color="failure" className="mb-4">
                {apiError}
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  value="Full Name"
                  className="mb-1 block"
                />
                <TextInput
                  {...register("name", { required: "Name is required" })}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  icon={HiUser}
                  color={errors.name ? "failure" : "gray"}
                  helperText={errors.name?.message}
                />
              </div>

              <div>
                <Label htmlFor="email" value="Email" className="mb-1 block" />
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
                  placeholder="name@example.com"
                  icon={HiMail}
                  color={errors.email ? "failure" : "gray"}
                  helperText={errors.email?.message}
                />
              </div>

              <div>
                <Label
                  htmlFor="photo"
                  value="Profile Photo"
                  className="mb-1 block"
                />
                <div className="flex items-center gap-4">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <HiPhotograph
                        className="text-gray-500 dark:text-gray-400"
                        size={20}
                      />
                    </div>
                  )}
                  <FileInput
                    {...register("photo")}
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="flex-grow"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Or enter a URL below
                </p>
                <TextInput
                  {...register("photoUrl")}
                  id="photoUrl"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="mt-2"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  value="Password"
                  className="mb-1 block"
                />
                <div className="relative">
                  <TextInput
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    color={errors.password ? "failure" : "gray"}
                    helperText={errors.password?.message}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <HiEyeOff size={18} />
                    ) : (
                      <HiEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  value="Confirm Password"
                  className="mb-1 block"
                />
                <TextInput
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  color={errors.confirmPassword ? "failure" : "gray"}
                  helperText={errors.confirmPassword?.message}
                />
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
                className="w-full mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
              <span className="mx-4 text-gray-500 dark:text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              color="light"
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle size={20} />
              Continue with Google
            </Button>

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
