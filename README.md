# Password Manager

Password Manager is a web application built with React and Vite for the frontend, and Node.js, Express, and MongoDB for the backend. This application allows users to securely store and manage their passwords.

## Features

- Add, edit, and delete passwords
- Toggle password visibility
- Responsive design
- Notifications for actions (save, delete)

## Technologies Used

### Frontend

- React
- Vite
- Tailwind CSS
- React Toastify

### Backend

- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lilithCode/password-manager.git
   cd PasswordManager
   ```

2. **Install frontend dependencies**:

   ```bash
   cd src
   npm install
   ```

3. **Install backend dependencies**:

   ```bash
   cd ../backend
   npm install
   ```

### Running the Application

1. **Start the backend server**:

   ```bash
   cd backend
   node server.js
   ```

2. **Start the frontend development server**:

   ```bash
   cd ../src
   npm run dev
   ```

3. **Open your browser and navigate to** `http://localhost:3000`

### Deployment

#### Deploying the Backend to Heroku

1. **Login to Heroku**:

   ```bash
   heroku login
   ```

2. **Create a new Heroku app**:

   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Add MongoDB to your Heroku app**:

   ```bash
   heroku addons:create mongolab
   ```

4. **Deploy to Heroku**:

   ```bash
   git add .
   git commit -m "Deploy backend to Heroku"
   git push heroku master
   ```

#### Deploying the Frontend to Vercel

1. **Login to Vercel**:

   ```bash
   vercel login
   ```

2. **Deploy to Vercel**:

   ```bash
   cd src
   vercel
   ```

### Environment Variables

Create a `.env` file in the `backend` directory and add the following environment variables:

```
MONGODB_URI=your-mongodb-uri
PORT=3000
```

### API Endpoints

- **GET /passwords**: Retrieve all passwords
- **POST /passwords**: Add a new password
- **DELETE /passwords/:id**: Delete a password by ID

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.