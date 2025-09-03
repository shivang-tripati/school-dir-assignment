"use client";

import { School } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";
import Toast from "./Toast";

interface SchoolCardProps {
  school: School;
}

export default function SchoolCard({ school }: SchoolCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    school.image ? `/schoolImages/${school.image}` : "/placeholder-school.jpg"
  );
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleImageError = () => {
    setImgSrc("/placeholder-school.jpg");
  };

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleContactClick = () => {
    showNotification("Contact information will be updated soon!");
  };

  const handleWebsiteClick = () => {
    showNotification("Website will go live soon!");
  };

  const generateSchoolDescription = (school: School) => {
    return `${school.name} is a prestigious educational institution located in ${school.city}, ${school.state}. 
    Situated at ${school.address}, this school provides quality education and excellent facilities for students. 
    For more information, you can contact them at ${school.contact} or email ${school.email_id}.`;
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <>
      {/* School Card */}
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="h-48 relative">
          <Image
            src={imgSrc}
            alt={school.name}
            fill
            className="object-cover"
            onError={handleImageError}
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
            Featured
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">
            {school.name}
          </h3>
          <p className="text-gray-600 mb-2 line-clamp-2 text-sm">
            {school.address}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-blue-600 font-medium">
              {school.city}, {school.state}
            </p>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm">
              View Details
            </span>
          </div>
        </div>
      </div>

      {/* School Detail Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative">
              <div className="h-64 relative">
                <Image
                  src={imgSrc}
                  alt={school.name}
                  fill
                  className="object-fill"
                  onError={handleImageError}
                />
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content - Scrollable area */}
            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {school.name}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Location
                  </h3>
                  <p className="text-gray-600 mb-2">{school.address}</p>
                  <p className="text-blue-600 font-medium">
                    {school.city}, {school.state}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Contact Information
                  </h3>
                  <p className="text-gray-600 mb-2">
                    <strong>Phone:</strong> {school.contact}
                  </p>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {school.email_id}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  About This School
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {generateSchoolDescription(school)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Quick Facts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">100+</div>
                    <div className="text-sm text-gray-600">Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">20+</div>
                    <div className="text-sm text-gray-600">Teachers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">5+</div>
                    <div className="text-sm text-gray-600">Programs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">A+</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 bg-white">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleContactClick}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact School
                </button>
                <button
                  onClick={handleWebsiteClick}
                  className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Visit Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
