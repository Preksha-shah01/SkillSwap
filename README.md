# SkillSwap

### A Collaborative Skill Exchange and Knowledge Sharing Platform

SkillSwap is a full-stack web application designed to help students connect, exchange skills, collaborate with peers, and share educational resources.

Built using the **MERN stack**, SkillSwap combines skill discovery, exchange requests, user profiles, and a Knowledge Hub in one platform.

> **Project Status:** Integrated and functionally tested on the `develop` branch.

---

## Features

### 1. User Authentication
- User registration and login
- Email/password authentication
- Google authentication using Firebase
- JWT-based authentication for protected backend operations
- Protected application routes

### 2. Student Dashboard
- Centralized student workspace
- Navigation to platform features
- Access to profile, skills, exchanges, and educational resources

### 3. Profile and Skills
- Student profile management
- Skill information management
- Support for skill discovery and exchange workflows

### 4. Skill Exchange
- Explore skills shared by other students
- Create skill exchange requests
- Manage incoming and outgoing requests
- Access the Swap Workspace

### 5. Knowledge Hub
- Browse student-shared educational resources
- Search resources by relevant keywords
- Filter resources by category
- Upload PDF, Word, and PowerPoint documents
- View resource details
- Download uploaded resources
- Open externally linked educational resources
- Paginated resource listings

Supported resource categories include Notes, PPTs, Assignments, PYQs, and Project Reports.

### 6. File Upload and Validation
- Authenticated resource uploads
- Maximum upload size of 10 MB
- Supported formats: PDF, DOC, DOCX, PPT, PPTX
- Server-side file validation
- Resource metadata stored in MongoDB

---

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, Firebase Authentication |
| File Upload | Multer |
| Routing | React Router |
| Version Control | Git, GitHub |

---

## Project Structure

```text
SkillSwap/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── package.json
│   └── ...
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Install or configure the following before running the application:

- Node.js and npm
- Git
- MongoDB Atlas database
- Firebase project with Google authentication configured
- Visual Studio Code or another code editor

## Installation and Local Setup

## Installation and Local Setup

### Prerequisites

- Node.js and npm compatible with Vite 8
- Git
- MongoDB Atlas database
- Firebase project with Google authentication configured

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd SkillSwap
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and configure the following variables:

| Variable | Description |
|---|---|
| `PORT` | Backend server port, typically 5000 |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secure JWT signing secret |
| `JWT_EXPIRES_IN` | Authentication token expiration |
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Local path to Firebase Admin credentials |

The Firebase service-account JSON must be obtained securely from the Firebase project administrator and must never be committed to GitHub.

### 3. Start the Backend

```bash
npm run dev
```

Alternatively:

```bash
npm start
```

The backend health-check endpoint is:

`http://localhost:5000/api/health`

### 4. Configure and Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Open the local address displayed by Vite, typically `http://localhost:5173`.

Configure the Firebase frontend settings according to the application's existing Firebase configuration.

### 5. Verify the Application

Log in and check the Dashboard, Profile Skills, Skill Exchange, Swap Workspace, Knowledge Hub, file upload, and resource download.

### 6. Production Build and Lint

```bash
cd client
npm run build
npm run lint
```

### Security Notes

Never commit `.env` files, JWT secrets, database credentials, Firebase service-account private keys, or uploaded student documents.

### Prerequisites

- Node.js and npm (use a version compatible with Vite 8)
- Git
- MongoDB Atlas account
- Firebase project configured for Google authentication

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd SkillSwap
```

### 2. Install and Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with the environment variables required by the application.

For example, configure the MongoDB connection string, JWT secret, Firebase Admin credentials path, and server port.

**Important:** Confirm the exact variable names in the backend source code. Never commit credentials or private keys.

### 3. Start the Backend

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The backend uses Express, MongoDB, JWT authentication, Firebase Admin SDK, and Multer for file uploads.

During local development, the backend runs at:

`http://localhost:5000`

Health-check endpoint:

`http://localhost:5000/api/health`

### 4. Install the Frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the local address displayed by Vite, typically:

`http://localhost:5173`

### 6. Verify the Application

Log in and test the following modules:

- Dashboard
- Profile Skills
- Skill Exchange
- Swap Workspace
- Knowledge Hub
- Upload Notes
- Resource Details and Download

### 7. Build and Lint

From the `client` directory:

```bash
npm run build
npm run lint
```

The build command generates production frontend assets in `client/dist/`. The lint command checks the frontend source for configured ESLint issues.

### Security

Never commit `.env` files, Firebase service-account credentials, MongoDB connection strings, JWT secrets, or uploaded student documents.

## Knowledge Hub API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/resources` | List and search resources |
| GET | `/api/resources/:id` | Get resource details |
| GET | `/api/resources/:id/download` | Download uploaded file |
| POST | `/api/resources/upload` | Upload a resource file |
| POST | `/api/resources` | Create a URL-based resource |
| PATCH | `/api/resources/:id` | Update a resource |
| DELETE | `/api/resources/:id` | Delete a resource |

Creating, updating, deleting, and uploading resources require appropriate authentication and authorization.

---

## Testing

The following functional workflows have been tested:

- Email/password login
- Google login
- Dashboard navigation
- Profile Skills
- Skill Exchange
- Swap Workspace
- Knowledge Hub resource listing
- Resource upload
- Resource details and download

The frontend production build has also completed successfully.

To run a production build:

```bash
cd client
npm run build
```

This verifies frontend compilation. It does not by itself constitute a full production security audit.

---

## Security Considerations

- Protect private backend operations with authentication.
- Validate uploaded files on the server.
- Enforce upload size restrictions.
- Keep credentials and secrets out of version control.
- Restrict resource modifications to authorized users.
- Avoid committing actual uploaded documents.
- Review security and deployment configuration before making the application publicly accessible.

---

## Future Enhancements

Potential future improvements include:

- AI-assisted skill recommendations
- Personalized learning recommendations
- Skill matching improvements
- Resource ratings and reviews
- Coin or reward system
- Notifications
- Cloud-based file storage
- Automated tests and deployment pipelines

These are proposed enhancements and should not be treated as completed features unless implemented.

---

## Project Team

Developed as a collaborative academic project by a team of four students.

Team member names and individual contributions can be added here.

---

## License

License information has not yet been specified. Add a license only after the project team agrees on the intended terms.