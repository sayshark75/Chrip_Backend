<img width="200px" src="https://user-images.githubusercontent.com/112304655/234843367-7317b7c3-b5ce-4fc6-a153-9f8fb79e9301.png"/>

# 📱 Chrip : : Social Media App Backend

This is a backend system for a social media app built with Node.js, Express.js, MongoDB, JSON Web Tokens (JWT), and Bcrypt. It enables users to create posts, add comments, and like posts and comments, all while ensuring authentication and authorization.

## 🚀 Features

- Secure registration and authentication with JWT and Bcrypt
- Authorization to ensure only authorized users can perform certain actions
- User can create posts with images and text
- User can add comments to posts
- User can like posts and comments
- Can add follow other people, and Vice-Versa
- Chat with other People.
- Notification system to alert users of new activity
- Analytics tools to track user engagement

## API Routes

### Authentication Routes

- 🚪 Signup route: `POST /api/auth/signup`

### Comment Routes

- 💬 Get all comments: `GET /api/comments`
- 💬 Get a comment by ID: `GET /api/comments/:commentId`
- 💬 Create a new comment: `POST /api/comments`
- 💬 Update a comment by ID: `PATCH /api/comments/:commentId`
- 💬 Delete a comment by ID: `DELETE /api/comments/:commentId`
- 👍 Get all likes by a comment: `GET /api/comment/:commentId/likes`

### Like Routes

- 👍 Get all likes: `GET /api/likes`
- 👍 Get a like by ID: `GET /api/likes/:likeId`
- 👍 Create a new like: `POST /api/likes`
- 👍 Delete a like by ID: `DELETE /api/likes/:likeId`

### Post Routes

- 📝 Get all posts: `GET /api/posts`
- 📝 Get a post by ID: `GET /api/posts/:postId`
- 📝 Create a new post: `POST /api/posts`
- 📝 Update a post by ID: `PATCH /api/posts/:postId`
- 📝 Delete a post by ID: `DELETE /api/posts/:postId`
- 💬 Get all comments by a post: `GET /api/posts/:postId/comments`
- 👍 Get all likes by a post: `GET /api/posts/:postId/likes`

### User Routes

- 👤 Get all users: `GET /api/users`
- 👤 Get a user by ID: `GET /api/users/:userId`
- 👤 Update a user by ID: `PATCH /api/users/:userId`
- 👤 Delete a user by ID: `DELETE /api/users/:userId`
- 📝 Get all posts by a user: `GET /api/users/:userId/posts`
- 💬 Get all comments by a user: `GET /api/users/:userId/comments`
- 👍 Get all likes by a user: `GET /api/users/:userId/likes`

## 🛠️ Installation

1. Clone the repository: `git clone https://github.com/your-username/social-media-app-backend.git`
2. Install dependencies: `npm install`
3. Configure the environment variables by creating a `.env` file and updating the values as needed:
  ```js
port=[YOUR PORT HERE]
MONGO_URL=[YOUR MONGO URL]/chrip
JWT_SECRET=[YOUR SECRET KEY]
  ```

4. Start the server: `npm run server`

## 🤝 Contributing

Contributions are always welcome! Please open an issue or submit a pull request to suggest changes or additions to this project.

## 📝 License

This project is licensed under the [MIT License](LICENSE).
