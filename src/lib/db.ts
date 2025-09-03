/* eslint-disable @typescript-eslint/no-explicit-any */
import mysql from 'mysql2/promise';

export async function query({ query, values = [] }: { query: string; values?: any[] }) {
  console.log('Checking available MySQL environment variables...');
  
  // Log available environment variables (for debugging)
  const availableVars = {
    MYSQL_URL: process.env.MYSQL_URL ? '***' : 'Not set',
    MYSQL_PUBLIC_URL: process.env.MYSQL_PUBLIC_URL ? '***' : 'Not set',
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? '***' : 'Not set',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_PORT: process.env.MYSQL_PORT,
    NODE_ENV: process.env.NODE_ENV
  };
  console.log('Available environment variables:', availableVars);

  let connectionConfig: any = {};

  // Priority 1: Use MYSQL_PUBLIC_URL (the public accessible URL)
  if (process.env.MYSQL_PUBLIC_URL) {
    console.log('Using MYSQL_PUBLIC_URL for database connection');
    
    try {
      // Parse the public URL
      const url = new URL(process.env.MYSQL_PUBLIC_URL);
      connectionConfig = {
        host: url.hostname,
        port: parseInt(url.port || '34415'),
        database: url.pathname.replace('/', ''),
        user: url.username,
        password: url.password,
        ssl: { rejectUnauthorized: false }
      };
    } catch (error) {
      console.error('Error parsing MYSQL_PUBLIC_URL:', error);
      // Fall through to next method
    }
  }
  
  // Priority 2: Use direct public connection details
  if (!connectionConfig.host && process.env.MYSQL_PASSWORD) {
    console.log('Using direct public connection details');
    connectionConfig = {
      host: 'maglev.proxy.rlwy.net', // From your public URL
      port: 34415, // From your public URL
      database: 'railway',
      user: 'root',
      password: process.env.MYSQL_PASSWORD,
      ssl: { rejectUnauthorized: false }
    };
  }

  // Priority 3: Use MYSQL_URL as fallback (but this might be internal)
  if (!connectionConfig.host && process.env.MYSQL_URL) {
    console.log('Using MYSQL_URL as fallback (may not work externally)');
    try {
      const dbconnection = await mysql.createConnection(process.env.MYSQL_URL);
      const [results] = await dbconnection.execute(query, values);
      await dbconnection.end();
      return results;
    } catch (error: any) {
      console.error('Database connection error with MYSQL_URL:', error);
      throw new Error('Failed to connect using MYSQL_URL: ' + error.message);
    }
  }

  // Validate we have connection config
  if (!connectionConfig.host) {
    const errorMsg = 'No valid database connection configuration found. Please check your environment variables.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  console.log('Database connection config:', {
    ...connectionConfig,
    password: '***' // Don't log the actual password
  });

  try {
    const dbconnection = await mysql.createConnection(connectionConfig);
    const [results] = await dbconnection.execute(query, values);
    await dbconnection.end();
    return results;
  } catch (error: any) {
    console.error('Database connection error:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.message
    });
    
    // Provide more helpful error messages
    let errorMessage = error.message;
    if (error.code === 'ECONNREFUSED') {
      errorMessage = `Connection refused to MySQL at ${connectionConfig.host}:${connectionConfig.port}. Check if the database is running and accessible.`;
    }
    
    throw new Error(errorMessage);
  }
}