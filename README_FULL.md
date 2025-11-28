# MernBlog - Professional MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js. Features user authentication, post creation, comments, and a responsive, professional UI.

## Features

- **User Authentication**: Register and login with JWT token-based authentication
- **Blog Posts Management**: Create, read, update, and delete blog posts
- **Categories**: Organize posts by categories
- **Comments**: Users can comment on posts
- **Search & Filter**: Search posts by title, content, and tags
- **Pagination**: Efficient post listing with pagination
- **Image Uploads**: Upload featured images for blog posts
- **Protected Routes**: Only authenticated users can create/edit posts
- **Responsive Design**: Professional, mobile-friendly UI without gradients

## Tech Stack

### Backend

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcryptjs for password hashing
- Multer for file uploads
- Express-validator for input validation

### Frontend

- React 18
- React Router v6
- Axios for API calls
- Context API for state management
- CSS3 for styling

## Project Structure

```
mern-blog/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── Navigation.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── PostDetailPage.jsx
│   │   │   ├── CreatePostPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/                # API services
│   │   │   └── api.js
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useAsync.js
│   │   ├── context/                 # Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── PostContext.jsx
│   │   ├── styles/                  # CSS stylesheets
│   │   │   ├── index.css
│   │   │   ├── Navigation.css
│   │   │   ├── PostCard.css
│   │   │   ├── Pagination.css
│   │   │   └── Forms.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── server/                          # Express backend
│   ├── config/
│   │   └── database.js              # MongoDB connection
│   ├── controllers/                 # Route controllers
│   │   ├── postController.js
│   │   ├── categoryController.js
│   │   └── authController.js
│   ├── middleware/                  # Custom middleware
│   │   ├── auth.js                  # JWT authentication
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/                      # Mongoose schemas
│   │   ├── Post.js
│   │   ├── Category.js
│   │   └── User.js
│   ├── routes/                      # API routes
│   │   ├── posts.js
│   │   ├── categories.js
│   │   └── auth.js
│   ├── uploads/                     # Uploaded files storage
│   ├── server.js                    # Main server file
│   ├── package.json
│   └── .env.example
└── README.md
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd mern-blog
```

2. Set up the server

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env` with your MongoDB URI and JWT secret:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-blog
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

3. Set up the client

```bash
cd ../client
npm install
cp .env.example .env
```

The `.env` file should contain:

```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. Start MongoDB (if running locally)

```bash
mongod
```

2. Start the server (from `/server` directory)

```bash
npm run dev
```

The server will run on http://localhost:5000

3. Start the client (from `/client` directory in a new terminal)

```bash
npm run dev
```

The client will run on http://localhost:5173

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Post Routes

- `GET /api/posts` - Get all published posts (with pagination)
- `GET /api/posts/search?q=query` - Search posts
- `GET /api/posts/:id` - Get post by ID
- `GET /api/posts/slug/:slug` - Get post by slug
- `GET /api/posts/category/:slug` - Get posts by category
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `POST /api/posts/:id/comments` - Add comment (protected)

### Category Routes

- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

## Usage

### Creating a Blog Post

1. Login to your account (or register if new)
2. Click "New Post" in the navigation
3. Fill in the form with title, content, category, and optionally upload an image
4. Click "Create Post" to save

### Publishing a Post

- Check the "Publish immediately" option when creating to publish right away
- Otherwise, posts are saved as drafts

### Commenting on Posts

1. Navigate to any post detail page
2. Scroll to the comments section
3. Type your comment and click "Post Comment"

### Searching Posts

- Use the search functionality (visible in expanded features)
- Search by title, content, or tags

## Design Features

- **Professional UI**: Clean, modern design without emojis or gradients
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Color Scheme**: Professional blues and neutral tones
- **Typography**: Clear hierarchy with readable fonts
- **Interactive Elements**: Smooth transitions and hover effects
- **Loading States**: User-friendly feedback during async operations
- **Error Handling**: Clear error messages for user guidance

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in localStorage
- Automatically included in API requests via axios interceptors
- Tokens expire after 7 days (configurable)
- Protected routes redirect unauthenticated users to login

## File Upload

Images are uploaded to the `/server/uploads` directory and served as static files:

- Maximum file size: 10MB
- Accepted formats: JPEG, JPG, PNG, GIF
- Files are accessible at `/uploads/<filename>`

## Error Handling

The application includes comprehensive error handling:

- API errors are caught and displayed to users
- Validation errors from the backend are shown
- Network errors are gracefully handled
- 401 errors trigger automatic logout

## Development

### Building for Production

Frontend:

```bash
cd client
npm run build
```

Server is ready for production with `npm start`

### Code Organization

- **Separation of Concerns**: Controllers handle business logic, routes handle requests
- **Reusable Components**: Common UI elements are extracted into components
- **Custom Hooks**: API logic is encapsulated in custom hooks
- **Context API**: Global state is managed with React Context

## Performance Optimizations

- Pagination for large post lists
- Image optimization with lazy loading ready
- Efficient API calls with caching headers
- Minified production builds

## Security Features

- Password hashing with bcryptjs
- JWT token validation on protected routes
- CORS configuration
- Input validation on both frontend and backend
- Protected file uploads with type validation

## Future Enhancements

- Email notifications for new comments
- User profiles and follow system
- Post drafts and scheduling
- Rich text editor for post content
- Social sharing features
- Analytics and post statistics
- Admin dashboard
- Post categories and tags management UI

## License

MIT License

## Support

For issues and questions, please create an issue in the repository.
