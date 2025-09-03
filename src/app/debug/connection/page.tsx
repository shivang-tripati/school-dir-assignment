/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "@/lib/db";

export default async function ConnectionDebug() {
  // Test the database connection
  let connectionTest = { success: false, error: "", config: {} };
  let envVars = {};

  try {
    // Get environment variables (for display purposes)
    envVars = {
      MYSQL_PUBLIC_URL: process.env.MYSQL_PUBLIC_URL ? "***" : "Not set",
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? "***" : "Not set",
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      MYSQL_URL: process.env.MYSQL_URL ? "***" : "Not set",
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_PORT: process.env.MYSQL_PORT,
      NODE_ENV: process.env.NODE_ENV,
    };

    // Test connection with a simple query
    await query({
      query: "SELECT 1 as test",
      values: [],
    });

    connectionTest = { success: true, error: "", config: envVars };
  } catch (error: any) {
    connectionTest = {
      success: false,
      error: error.message,
      config: envVars,
    };
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Database Connection Debug</h1>

      <div className="mb-6 p-4 rounded-md bg-gray-100">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <pre className="bg-white p-4 rounded overflow-auto">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </div>

      <div
        className={`p-4 rounded-md ${
          connectionTest.success
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        <h2 className="text-xl font-semibold mb-2">Connection Test</h2>
        {connectionTest.success ? (
          <div>
            <p className="font-bold">✅ Database connection successful!</p>
            <p className="mt-2">
              Your application can connect to the MySQL database.
            </p>
          </div>
        ) : (
          <div>
            <p className="font-bold">❌ Database connection failed</p>
            <p className="mt-2">Error: {connectionTest.error}</p>

            <div className="mt-4 p-3 bg-yellow-100 rounded">
              <h3 className="font-semibold">Troubleshooting steps:</h3>
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Make sure MYSQL_PUBLIC_URL is set correctly</li>
                <li>Verify the MySQL service is running on Railway</li>
                <li>
                  Check that your IP is allowed to connect to the MySQL database
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {!connectionTest.success && (
        <div className="mt-6 p-4 rounded-md bg-blue-100">
          <h2 className="text-xl font-semibold mb-2">How to Fix on Railway</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Go to your Railway project dashboard</li>
            <li>
              Click on your <strong>application service</strong>
            </li>
            <li>Go to the &quote;Variables&quote; tab</li>
            <li>
              Make sure you have these variables:
              <ul className="list-disc pl-5 mt-1">
                <li>
                  <code>MYSQL_PUBLIC_URL</code> (with your public connection
                  string)
                </li>
                <li>
                  <code>MYSQL_PASSWORD</code> (your MySQL password)
                </li>
              </ul>
            </li>
            <li>
              Remove any internal-only variables like{" "}
              <code>MYSQL_HOST=mysql.railway.internal</code>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
