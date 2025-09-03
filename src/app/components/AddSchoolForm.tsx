/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { SchoolFormData } from "@/types";

export default function AddSchoolForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SchoolFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    setMessage("");
    setErrorDetails("");

    try {
      // Upload image first if exists
      let imageFilename = null;
      if (data.image && data.image.length > 0) {
        try {
          const formData = new FormData();
          formData.append("image", data.image[0]);

          const uploadResponse = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (uploadResponse.status === 200) {
            imageFilename = uploadResponse.data.filename;
          } else {
            throw new Error(uploadResponse.data.error || "Upload failed");
          }
        } catch (uploadError: unknown) {
          console.error("Upload error:", uploadError);

          setIsSubmitting(false);
          return;
        }
      }

      // Submit school data
      const schoolData = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: parseInt(data.contact),
        email_id: data.email_id,
        image: imageFilename,
      };

      console.log("Submitting school data:", schoolData);
      const response = await axios.post("/api/schools", schoolData);

      if (response.status === 201) {
        setMessage("School added successfully!");
        reset();
      }
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        setErrorDetails(
          `Server error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setErrorDetails(
          "No response from server. Please check your connection."
        );
      } else {
        // Something happened in setting up the request
        console.error("Error setting up request:", error.message);
        setErrorDetails(`Request error: ${error.message}`);
      }

      setMessage("Error adding school. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New School
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            School Name*
          </label>
          <input
            id="name"
            {...register("name", { required: "School name is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address*
          </label>
          <textarea
            id="address"
            rows={3}
            {...register("address", { required: "Address is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City*
            </label>
            <input
              id="city"
              {...register("city", { required: "City is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700"
            >
              State*
            </label>
            <input
              id="state"
              {...register("state", { required: "State is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700"
            >
              Contact Number*
            </label>
            <input
              id="contact"
              type="number"
              {...register("contact", {
                required: "Contact number is required",
                minLength: {
                  value: 10,
                  message: "Contact number must be at least 10 digits",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">
                {errors.contact.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email_id"
              className="block text-sm font-medium text-gray-700"
            >
              Email*
            </label>
            <input
              id="email_id"
              type="email"
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email_id.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            School Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding School..." : "Add School"}
        </button>

        {message && (
          <div
            className={`text-center mt-4 p-3 rounded-md ${
              message.includes("Error")
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-green-100 text-green-700 border border-green-200"
            }`}
          >
            <p className="font-medium">{message}</p>
            {errorDetails && (
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer">Error details</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                  {errorDetails}
                </pre>
              </details>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
