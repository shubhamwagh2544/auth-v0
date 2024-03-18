# Auth App

Auth App is a full-stack web application built using React, Node.js, Express, MongoDB, and Firebase Authentication. It provides user authentication features such as signup, signin, profile management, OAuth (Google sign-in), and more.

## Features

- **User Authentication**: Users can sign up with a username, email, and password. Existing users can sign in using their email and password.
- **Password Hashing**: User passwords are securely hashed before being stored in the database, ensuring the security of user data.
- **OAuth**: Users can sign in using their Google accounts through OAuth.
- **Profile Management**: Users can update their profile information and profile photo.
- **Token-based Authentication**: JSON Web Tokens (JWT) are used for user authentication and authorization.
- **Error Handling**: Comprehensive error handling for various scenarios, including invalid credentials, unauthorized access, and internal server errors.
- **Protected Routes**: Certain routes are protected and can only be accessed by authenticated users.

## Technologies Used

- **Frontend**: React, React Router, Redux (for state management), Tailwind CSS (for styling)
- **Backend**: Node.js, Express.js, MongoDB (with Mongoose ORM), Firebase Authentication
- **Other Tools**: Axios (for HTTP requests), JWT (for token-based authentication), NPM (for package management)

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Install dependencies:

   ```
   cd auth-app
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGO=<MongoDB_Connection_String>
   JWT_SECRET_KEY=<Your_JWT_Secret_Key>
   ```

4. Start the backend server:

   ```
   npm run dev
   ```

5. Navigate to the `client` directory and install frontend dependencies:

   ```
   cd client
   npm install
   ```

6. Create a `.env` file in the root directory and add the following environment variables:

   ```
   VITE_FIREBASE_API_KEY=<FIREBASE_API_KEY>
   ```

7. Start the frontend development server:

   ```
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173` to access the application.

## Deployment

The application is deployed using Render Platform

## Live Demo

The project is currently live on Render. You can access the temporary deployment using the following link: [Temporary Deployment](https://auth-v0.onrender.com)

## Todo
- **Responsive Design**: The application should be responsive and accessible on various devices and screen sizes.