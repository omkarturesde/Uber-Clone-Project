# User Registration Endpoint

## POST /users/register

### Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: The user's first name (minimum 3 characters).
  - `lastname`: The user's last name (optional, minimum 3 characters if provided).
- `email`: The user's email address (must be a valid email).
- `password`: The user's password (minimum 6 characters).

Example:
```json
{
  "fullname": {
    "firstname": "Omkar",
    "lastname": "Ture"
  },
  "email": "omkar.ture@example.com",
  "password": "password123"
}
```

### Response

#### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY...",
  "user": {
    "fullname": {
      "firstname": "Omkar",
      "lastname": "Ture"
    },
    "email": "omkar.ture@example.com",
    "_id": "65f123456789abcdef123456",
    "__v": 0
  }
}
```

#### Error Response (400)
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

# Login Endpoint

## POST /users/login

### Description
This endpoint authenticates an existing user using their email and password.

### Request Body
The request body should be a JSON object with the following fields:
- `email`: The user's registered email address
- `password`: The user's password

Example:
```json
{
  "email": "omkar.ture@example.com",
  "password": "password123"
}
```

### Response

#### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY...",
  "user": {
    "fullname": {
      "firstname": "Omkar",
      "lastname": "Ture"
    },
    "email": "omkar.ture@example.com",
    "_id": "65f123456789abcdef123456",
    "__v": 0
  }
}
```

#### Error Response (401)
```json
{
  "message": "Incorrect Email or Password"
}
```

#### Validation Error Response (400)
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

# Get User Profile Endpoint

## GET /users/profile

### Description
This endpoint retrieves the profile information of the authenticated user.

### Headers Required
- `Authorization`: Bearer token (JWT token received after login)

### Response

#### Success Response (200)
```json
{
  "fullname": {
    "firstname": "Omkar",
    "lastname": "Ture"
  },
  "email": "omkar.ture@example.com"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

# Logout Endpoint

## GET /users/logout

### Description
This endpoint logs out the currently authenticated user by blacklisting their token.

### Headers Required
- `Authorization`: Bearer token (JWT token received after login)

### Response

#### Success Response (200)
```json
{
  "message": "Logged out"
}
```

#### Error Response (401)
```json
{
  "message": "Unauthorized"
}
```

# Captain Registration Endpoint

## POST /captains/register

### Description
This endpoint registers a new captain with their vehicle details.

### Request Body
The request body should be a JSON object with the following fields:
- `fullname`: An object containing:
  - `firstname`: Captain's first name (minimum 3 characters)
  - `lastname`: Captain's last name (optional)
- `email`: Captain's email address (must be a valid email)
- `password`: Captain's password (minimum 6 characters)
- `vehicle`: An object containing:
  - `color`: Vehicle color (minimum 3 characters)
  - `plate`: Vehicle plate number (minimum 3 characters)
  - `capacity`: Vehicle passenger capacity (must be a number)
  - `vehicleType`: Type of vehicle (must be 'car', 'motorcycle', or 'auto')

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Black",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response

#### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "65f123456789abcdef123456",
    "__v": 0
  }
}
```

#### Error Response (400)
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

#### Duplicate Email Error (400)
```json
{
  "message": "Captain already exists"
}
```

# Captain Login Endpoint

## POST /captains/login

### Description
This endpoint authenticates an existing captain using their email and password.

### Request Body
The request body should be a JSON object with the following fields:
- `email`: Captain's registered email address (must be a valid email)
- `password`: Captain's password (minimum 6 characters)

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Response

#### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "Black",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    },
    "_id": "65f123456789abcdef123456",
    "__v": 0
  }
}
```

#### Error Response (400)
```json
{
  "message": "Invalid email or password"
}
```

#### Validation Error Response (400)
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid email",
      "path": "email",
      "location": "body"
    }
  ]
}
```
