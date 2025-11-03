# Express JWT Protected Routes

A Node.js and Express.js backend implementation demonstrating JWT-based authentication and protected routes.

## Overview

This project demonstrates how to:
- Implement JWT token-based authentication
- Create middleware for token verification
- Protect API routes from unauthorized access
- Handle Bearer token authentication

## Features

- ✅ **Login endpoint** - Issues JWT tokens for valid credentials
- ✅ **JWT middleware** - Verifies tokens from Authorization header
- ✅ **Protected routes** - Accessible only with valid JWT tokens
- ✅ **Hardcoded demo user** - For testing purposes

## Project Structure

```
express-jwt-protected-routes/
├── server.js          # Main application file with all routes and middleware
├── package.json       # Project dependencies
├── .env.example      # Example environment variables
├── .gitignore        # Git ignore file
└── README.md         # Project documentation
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sujal0717/express-jwt-protected-routes.git
cd express-jwt-protected-routes
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Usage

### 1. Login to Get Token

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Access Protected Routes

Use the token from login in the Authorization header:

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Protected Endpoints:**

- `GET /dashboard` - Access dashboard data
- `GET /profile` - Access profile information

**Example Response (with valid token):**
```json
{
  "success": true,
  "message": "Welcome to the protected dashboard!",
  "user": {
    "username": "admin"
  }
}
```

**Error Response (without token):**
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

**Error Response (invalid token):**
```json
{
  "success": false,
  "message": "Invalid or expired token."
}
```

## API Endpoints

| Method | Endpoint     | Protected | Description                    |
|--------|-------------|-----------|--------------------------------|
| GET    | /           | No        | Welcome message and API info   |
| POST   | /login      | No        | Login and receive JWT token    |
| GET    | /dashboard  | Yes       | Protected dashboard route      |
| GET    | /profile    | Yes       | Protected profile route        |

## Testing with cURL

### 1. Login:
```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

### 2. Access Protected Route (replace TOKEN with actual token):
```bash
curl http://localhost:3000/dashboard \
  -H "Authorization: Bearer TOKEN"
```

### 3. Test Without Token (should fail):
```bash
curl http://localhost:3000/dashboard
```

## Testing with Postman/Thunder Client

1. **Login Request:**
   - Method: POST
   - URL: `http://localhost:3000/login`
   - Body (JSON):
     ```json
     {
       "username": "admin",
       "password": "password123"
     }
     ```
   - Copy the `token` from the response

2. **Protected Route Request:**
   - Method: GET
   - URL: `http://localhost:3000/dashboard`
   - Headers:
     - Key: `Authorization`
     - Value: `Bearer <paste_token_here>`

## Security Notes

⚠️ **Important:** This is a demo project for learning purposes.

For production use:
- Store `SECRET_KEY` in environment variables, not in code
- Use a strong, randomly generated secret key
- Implement user database instead of hardcoded credentials
- Add password hashing (bcrypt)
- Implement token refresh mechanism
- Add rate limiting
- Use HTTPS in production
- Consider token expiration and refresh strategies

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **jsonwebtoken** - JWT implementation

## License

ISC
