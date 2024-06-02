# Authentication Page & Home

This project is a React application with authentication and a home page. It uses `react-router-dom` for routing, `axios` for HTTP requests, and `context` API for state management.

# Project Structure

frontend/

├── public/

├── index.html

├── src/

│ ├── components/

│ │ ├── Auth/

│ │ │ ├── Login.js

│ │ │ ├── Register.js

│ │ ├── Home.js

│ ├── context/

│ │ ├── AuthContext.js

│ ├── App.js

│ ├── index.js

│ ├── index.css

│ ├── reportWebVitals.js

├── .env

├── package.json

# Setup Instructions

Following the steps below you would be directed to an empty page due to some issues which have yet to fix. 

Step 1: Install Node.js
Ensure that you have Node.js installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

Step 2: Clone the Repository
Clone the repository to your local machine:

 git clone https://github.com/sivaramjeychand/Quantum_Pioneers
 
 cd Quantum-Pioneers/frontend

Step 3: Install Dependencies 
 npm install

Step 4: Environment Variables
 Create a .env file in the root directory of the backend and add the following content:

  MONGO_URI=mongodb://localhost:27017/mydatabase
  JWT_SECRET=mysecret

Step 5: Start the Backend Server
 cd backend
 node server.js

Step 6: Start the Frontend Development Server
 cd frontend
 npm start
