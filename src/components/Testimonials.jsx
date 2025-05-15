import { useState, useEffect } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Travel Blogger",
      content:
        "VisaMaster made my Schengen visa application so easy! The document checklist was incredibly helpful and saved me hours of research.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Consultant",
      content:
        "As someone who travels frequently for work, I rely on VisaMaster's accurate processing times. Their service has never let me down.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Amina Diallo",
      role: "Student",
      content:
        "Getting my student visa was stress-free thanks to VisaMaster's step-by-step guidance. The support team answered all my questions promptly.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Digital Nomad",
      content:
        "I've used VisaMaster for multiple countries now. Their fee calculator helped me budget accurately and avoid surprises.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/71.jpg",
    },
  ];

  // Auto-advance testimonials
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        goToNext();
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [currentTestimonial, isAutoPlaying]);

  const goToNext = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const goToPrev = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Hear from travelers who've used our services for their visa needs
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-blue-600 dark:text-blue-400" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-md hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-blue-600 dark:text-blue-400" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: index === currentTestimonial ? 1 : 0.7,
                      scale: index === currentTestimonial ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 ${
                      index === currentTestimonial
                        ? "opacity-100"
                        : "opacity-0 absolute"
                    }`}
                  >
                    <FaQuoteLeft className="text-blue-200 dark:text-gray-600 text-3xl mb-6" />
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      {testimonial.content}
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {testimonial.role}
                        </p>
                        <div className="mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                  currentTestimonial === index
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
