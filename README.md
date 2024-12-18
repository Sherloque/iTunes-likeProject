# Project Demo Setup Guide

Follow these steps to set up and run a demo of the project.

## Prerequisites

Before running the demo, ensure the following are installed on your local machine:

- MongoDB server
- Node.js and npm
- `http-server` (for song upload functionality)

## Setup Instructions

### 1. Install and Start MongoDB Server Locally

Run the following commands to install and start MongoDB:

```
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor
```
```
echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```
```
sudo apt update
```
```
sudo apt install -y mongodb-org
```
```
sudo systemctl start mongod
```
```
sudo systemctl status mongod

```
### 2. Clone the Repository
Clone the project repository to your local machine:

```
git clone https://github.com/Sherloque/iTunes-likeProject.git
```
### 3. Install Backend Dependencies
Navigate to the backend folder and install dependencies:

```
cd back
```
```
npm install
```
### 4. Start the Backend Server
Start the backend server:

```
node index.js
```

### 5. Enable CORS Access
Open the following link to enable CORS access:
```
https://cors-anywhere.herokuapp.com/corsdemo
```
Follow the instructions on the page to enable access.

###  6. Install Frontend Dependencies
Navigate to the frontend folder and install dependencies:
```
cd front
```
```
npm install
```
###  7. Start the Frontend Client
Start the frontend client:
```
npm start
```
###  8. Access the Project
Once everything is set up, the project should automatically open in your browser. If it doesn’t, navigate to:
```
http://localhost:3000/feed
```
###   9. Check Project Functionality
All pages should be operational, including:
- ####    Login
- ####    Sign Up
- ####    Feed (with Hot Chart)
- ####    Profile
###   10. Song Upload (Optional)
To enable song upload functionality:

Install http-server globally:
```
npm install -g http-server
```
Navigate to the core folder (which contains both the backend and frontend folders) and run:

```
http-server -p 8887
```
###   Troubleshooting
If MongoDB is not running, check the status with:
```
sudo systemctl status mongod
```
If you encounter any issues with Node.js or npm dependencies, run:
```
npm update
```
