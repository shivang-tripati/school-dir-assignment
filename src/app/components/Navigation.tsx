import Link from "next/link";

export default function Navigation() {
  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-center mb-4">Explore Schools</h1>
        <nav className="flex justify-center space-x-6">
          <Link
            href="/"
            className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/add-school"
            className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add School
          </Link>
          <Link
            href="/show-schools"
            className="px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Schools
          </Link>
        </nav>
      </div>
    </header>
  );
}
