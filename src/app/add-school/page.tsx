import AddSchoolForm from "@/app/components/AddSchoolForm";
import Navigation from "@/app/components/Navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add School - School Management System",
  description: "Add a new school to the database",
};

export default function AddSchool() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <AddSchoolForm />
      </main>
    </div>
  );
}
