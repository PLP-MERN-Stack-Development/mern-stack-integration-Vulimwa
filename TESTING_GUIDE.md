# How to Test Your MERN Blog Application

Both servers are now running:

- **Backend Server:** http://localhost:5000
- **Frontend App:** http://localhost:5173

## Step-by-Step Testing Guide

### Step 1: Register a New Account

1. Open http://localhost:5173 in your browser
2. Click "Register" in the navigation bar
3. Fill in:
   - Full Name: Your name
   - Email: your-email@example.com
   - Password: at least 6 characters
   - Confirm Password: same password
4. Click "Register"
5. You'll be logged in automatically and redirected to home page

### Step 2: Check Login Status

After registration, you should see:

- Your name displayed in the top-right corner of the navigation bar
- "New Post" link in the navigation (only for logged-in users)
- "Logout" button next to your name

### Step 3: Create a Blog Post

1. Click "New Post" in the navigation bar
2. Fill in the post form:
   - **Title** (required): Give your post a title
   - **Category** (required): Select or create a category
   - **Excerpt** (optional): Short description
   - **Content** (required): Write your blog post
   - **Tags** (optional): Add tags separated by commas (e.g., react, nodejs, blog)
   - **Featured Image** (optional): Upload an image
3. Choose "Publish immediately" if you want it visible right away
4. Click "Create Post"

### Step 4: View Your Posts

1. Go to "Home" to see all published posts
2. Click "Read More" on any post card to view full details
3. Scroll down to see and add comments

### Step 5: Add Comments

1. On a post detail page, scroll to the "Comments" section
2. Type your comment in the text area
3. Click "Post Comment"
4. Your comment will appear with your username and timestamp

### Step 6: Test Logout

1. Click your name in the navigation
2. Click "Logout"
3. Notice the navigation changes to show "Login" and "Register" links
4. "New Post" link disappears (you're no longer authenticated)

## Features You Can Test

### Authentication

- Register with new account
- Login with credentials
- Logout
- Protected routes (try accessing /create-post without logging in)

### Blog Posts

- Create posts (title, content, category required)
- Upload featured images
- Add tags to posts
- Publish immediately or save as draft
- View post details
- Track view counts

### Comments

- Add comments to posts (requires login)
- See all comments with author info
- View comment timestamps

### Categories

- Posts are organized by categories
- Filter posts by category

### Pagination

- Posts are paginated (shows multiple pages if you have many posts)
- Navigate between pages

### Search

- Search posts by content

## Troubleshooting

### "Cannot create post" or "Unauthorized"

**Solution:** Make sure you're logged in. Your name should appear in the top-right of the navigation bar.

### Post not appearing after creation

**Solution:**

1. Make sure "Publish immediately" was checked
2. Check the home page after creating
3. Refresh the page if needed

### Login not working

**Solution:**

1. Make sure you registered first
2. Use the exact email and password you registered with
3. Check the browser console for error messages

### API errors

**Solution:**

1. Make sure the server is running (check port 5000)
2. Check that backend terminal shows "Server running on port 5000"
3. Restart both servers if needed

## Test Account (if you want to test without registering)

Create an account with:

- Name: Test User
- Email: test@example.com
- Password: test123

Then you can log in with these credentials.

## Files Location

- **Frontend App:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Project Folder:** C:\Users\ADMIN\Desktop\PLP_ACADEMY\MERN\Assignments\mern-stack-integration-Vulimwa

## Server Status Indicators

### Backend Terminal Should Show:

```
MongoDB connected: localhost
Server running on port 5000
Environment: development
```

### Frontend Terminal Should Show:

```
VITE ready in XXXX ms
Local: http://localhost:5173/
```

## Next Steps

1. Test creating multiple posts
2. Test different categories
3. Try logging out and logging back in
4. Check that your session persists
5. Explore all the features

Your MERN blog is fully functional and ready to use!
