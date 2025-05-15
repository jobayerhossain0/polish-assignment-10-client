import { ColorRing } from "react-loader-spinner";
import PropTypes from "prop-types";

const LoadingSpinner = ({
  size = 80,
  message = "",
  fullScreen = false,
  colorPalette = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899"], // Purple/pink gradient
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        fullScreen ? "h-screen w-screen" : "h-[80vh] w-full"
      }`}
    >
      <div className="flex flex-col items-center">
        <ColorRing
          visible={true}
          height={size}
          width={size}
          ariaLabel="loading-spinner"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={colorPalette}
        />
        {message && (
          <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  message: PropTypes.string,
  fullScreen: PropTypes.bool,
  colorPalette: PropTypes.arrayOf(PropTypes.string),
};

export default LoadingSpinner;
