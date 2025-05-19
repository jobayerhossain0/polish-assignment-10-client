import { useContext, useState } from "react";
import {
  FiEdit,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import { AuthContext } from "../provider/AuthProvider";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    ...user,
    phone: user.providerData[0]?.phoneNumber || "Not provided",
    location: "San Francisco, CA", // Add additional fields not in Firebase
    bio: "Full-stack developer specializing in MERN stack applications.",
    stats: {
      visasApplied: 12,
      visasApproved: 8,
      favorites: 4,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically call Firebase to update user profile
    // await updateProfile(auth.currentUser, {
    //   displayName: localUser.displayName, photoURL: localUser.photoURL
    // });
  };

  // Calculate account age
  const createdAtDate = new Date(parseInt(user.createdAt));
  const accountAge = Math.floor(
    (new Date() - createdAtDate) / (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="relative">
            <img
              src={localUser.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
            />
            {isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition">
                <FiEdit size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={localUser.displayName}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-900 mb-1 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {localUser.displayName}
                    </h1>
                    {user.emailVerified && (
                      <div className="flex items-center justify-center sm:justify-start text-green-600 text-sm mt-1">
                        <FiCheckCircle className="mr-1" />
                        <span>Verified Account</span>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-gray-600">
                  User ID: {user.uid.substring(0, 8)}...
                </p>
              </div>
              <div className="flex justify-center sm:justify-end space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                  >
                    <FiEdit className="mr-2" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="px-6 sm:px-8 pb-6 border-b border-gray-200">
            {isEditing ? (
              <textarea
                name="bio"
                value={localUser.bio}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            ) : (
              <p className="text-gray-700">{localUser.bio}</p>
            )}
          </div>

          {/* Stats */}
          <div className="px-6 sm:px-8 py-4 grid grid-cols-3 divide-x divide-gray-200 text-center">
            <div className="px-4 py-2">
              <p className="text-2xl font-bold text-gray-900">
                {localUser.stats.visasApplied}
              </p>
              <p className="text-gray-600 text-sm">Visas Applied</p>
            </div>
            <div className="px-4 py-2">
              <p className="text-2xl font-bold text-gray-900">
                {localUser.stats.visasApproved}
              </p>
              <p className="text-gray-600 text-sm">Approved</p>
            </div>
            <div className="px-4 py-2">
              <p className="text-2xl font-bold text-gray-900">
                {localUser.stats.favorites}
              </p>
              <p className="text-gray-600 text-sm">Favorites</p>
            </div>
          </div>

          {/* User Details */}
          <div className="px-6 sm:px-8 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FiMail className="text-gray-500 mr-3" />
                <div>
                  <span className="text-gray-700">{user.email}</span>
                  {user.emailVerified && (
                    <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <FiUser className="text-gray-500 mr-3" />
                <span className="text-gray-700">
                  {user.providerData
                    .map((provider) => provider.providerId)
                    .join(", ")}
                </span>
              </div>

              <div className="flex items-center">
                <FiCalendar className="text-gray-500 mr-3" />
                <span className="text-gray-700">
                  Account age: {accountAge} year{accountAge !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="flex items-center">
                <FiMapPin className="text-gray-500 mr-3" />
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={localUser.location}
                    onChange={handleInputChange}
                    className="flex-1 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <span className="text-gray-700">{localUser.location}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Visa Applications
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((item) => (
              <div key={item} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4">
                    <FiUser className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Visa Application #{item}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {["Pending", "Approved", "Rejected"][item - 1]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
