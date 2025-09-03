# School Directories

A comprehensive School Management System built with Next.js, TypeScript, and MySQL that allows users to add and browse schools in an ecommerce-style interface.

![School Management System](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)

## Live Demo

- **Live Application**: [https://school-dir-assignment.vercel.app/](https://school-dir-assignment.vercel.app/)
- **GitHub Repository**: [https://github.com/shivang-tripati/school-dir-assignment.git](https://github.com/shivang-tripati/school-dir-assignment.git)

## Features

### Core Functionality

- **Add School Form** (`/add-school`) with comprehensive validation
- **School Display Page** (`/show-schools`) with ecommerce-style layout
- **MySQL Database Integration** hosted on Railway
- **Fully Responsive Design** for both mobile and desktop

### Page 1: Add School Form

- React Hook Form with comprehensive validation
- Input validation for all fields (required fields, email format, phone number length)
- Image upload functionality saving to `schoolImages` folder
- Error handling with user-friendly messages
- Success feedback upon successful submission

### Page 2: Show Schools

- Ecommerce-style layout with school cards
- Modal popup for detailed school information
- Search functionality to filter schools by name, city, state, or address
- Filtering options by state with dynamic dropdown
- Sorting capability by name, city, or state
- Image fallback handling for missing images

### Additional Features

- Home page with navigation and feature highlights
- TypeScript implementation for type safety
- Toast notifications for user feedback
- Professional UI/UX design
- Error handling and loading states

## API Routes

- `POST /api/schools` - Add new school to database
- `GET /api/schools` - Retrieve all schools
- `POST /api/upload` - Handle image uploads

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Hook Form
- **Backend**: Next.js API Routes
- **Database**: MySQL hosted on Railway
- **Deployment**: Vercel
- **Image Handling**: Local filesystem storage with fallbacks

## Assignment Requirements Checklist

### ✅ Mandatory Requirements

- Use Next.js with TypeScript
- MySQL database integration
- Two pages: Add School and Show Schools
- Form validation with react-hook-form
- Image storage in schoolImages folder
- Ecommerce-style school display
- Responsive design for mobile and desktop
- School name, address, city, and image visible in listing

### ✅ Bonus Features Implemented

- Search functionality
- Filtering by state
- Sorting options
- Detailed modal view
- Toast notifications
- Professional UI/UX design
- Error handling and loading states
- Image fallback handling

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MySQL database (local or hosted)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/shivang-tripati/school-dir-assignment.git
   cd school-dir-assignment
   ```
