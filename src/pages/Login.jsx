import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button, Label, TextInput, Spinner, Checkbox } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff, HiMail } from "react-icons/hi";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password, rememberMe);
      navigate(from, { replace: true });
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.message || "Could not login!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate(from, { replace: true });
      toast.success("Login successful");
    } catch (err) {
      toast.error(err.message || "Could not login with Google!");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Helmet>
        <title>VisaMaster | Login</title>
      </Helmet>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-1">Sign in to your account</p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="email" value="Email" className="mb-1 block" />
                <TextInput
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  icon={HiMail}
                  className="w-full"
                  shadow
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
                    {...register("password", { required: true })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pr-10"
                    shadow
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Label htmlFor="remember" className="ml-2">
                    Remember me
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                gradientDuoTone="purpleToBlue"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
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
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
