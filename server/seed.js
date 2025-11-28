/**
 * Database Seed Script
 * Populate MongoDB with sample users, categories, and blog posts
 * Usage: node seed.js
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Category = require("./models/Category");
const Post = require("./models/Post");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUrl =
      process.env.MONGO_URI || "mongodb://localhost:27017/mern-blog";
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log("Cleared existing data");

    // Create sample users
    const hashedPassword1 = await bcrypt.hash("password123", 10);
    const hashedPassword2 = await bcrypt.hash("password456", 10);
    const hashedPassword3 = await bcrypt.hash("password789", 10);

    const users = await User.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword1,
        bio: "Passionate blogger and web developer",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword2,
        bio: "Digital marketer and content creator",
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: hashedPassword3,
        bio: "Tech enthusiast and software engineer",
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample categories
    const categories = await Category.create([
      {
        name: "Technology",
        slug: "technology",
        description: "Latest tech news and tutorials",
      },
      {
        name: "Web Development",
        slug: "web-development",
        description: "Tips and tricks for web developers",
      },
      {
        name: "Mobile Apps",
        slug: "mobile-apps",
        description: "Mobile app development and design",
      },
      {
        name: "Artificial Intelligence",
        slug: "ai",
        description: "AI and machine learning insights",
      },
      {
        name: "Lifestyle",
        slug: "lifestyle",
        description: "Personal growth and life tips",
      },
    ]);
    console.log(`Created ${categories.length} categories`);

    // Create sample posts
    const posts = await Post.create([
      {
        title: "Getting Started with React Hooks",
        slug: "getting-started-react-hooks",
        excerpt:
          "Learn how to use React Hooks to manage state and side effects in functional components.",
        content: `React Hooks have revolutionized the way we write React components. In this comprehensive guide, we'll explore:

1. **useState Hook** - Managing component state
2. **useEffect Hook** - Handling side effects
3. **useContext Hook** - Accessing context without class components
4. **Custom Hooks** - Creating reusable logic

Hooks allow you to use state and other React features without writing a class component. They make it easier to reuse stateful logic between components and are the recommended approach for new React applications.`,
        author: users[0]._id,
        category: categories[1]._id,
        tags: ["react", "hooks", "javascript"],
        featuredImage: null,
        isPublished: true,
        views: 1250,
      },
      {
        title: "The Future of Web Development in 2025",
        slug: "future-web-development-2025",
        excerpt:
          "Exploring emerging trends and technologies that will shape web development in the coming years.",
        content: `The web development landscape is constantly evolving. Here are the key trends to watch:

1. **AI-Powered Development** - AI assistants helping developers write better code faster
2. **Edge Computing** - Bringing computation closer to data sources
3. **WebAssembly** - Running high-performance code in the browser
4. **Serverless Architecture** - Scaling without managing infrastructure
5. **Progressive Web Apps** - Bridging the gap between web and mobile apps

Staying updated with these trends is crucial for modern developers.`,
        author: users[1]._id,
        category: categories[0]._id,
        tags: ["webdev", "trends", "2025"],
        featuredImage: null,
        isPublished: true,
        views: 2100,
      },
      {
        title: "Building Scalable Node.js Applications",
        slug: "scalable-nodejs",
        excerpt:
          "Best practices for building Node.js applications that can handle millions of requests.",
        content: `Scalability is a crucial consideration when building Node.js applications. Key strategies include:

1. **Clustering** - Utilize multiple CPU cores
2. **Load Balancing** - Distribute traffic across servers
3. **Caching** - Reduce database queries with Redis
4. **Database Optimization** - Use indexes and query optimization
5. **Async Operations** - Prevent blocking operations
6. **Monitoring** - Track application performance

Implementing these practices ensures your Node.js application can scale efficiently.`,
        author: users[2]._id,
        category: categories[1]._id,
        tags: ["nodejs", "scalability", "backend"],
        featuredImage: null,
        isPublished: true,
        views: 980,
      },
      {
        title: "Introduction to Machine Learning",
        slug: "intro-machine-learning",
        excerpt:
          "A beginner-friendly introduction to machine learning concepts and applications.",
        content: `Machine Learning is transforming industries. Let's cover the basics:

1. **Supervised Learning** - Learning from labeled data
2. **Unsupervised Learning** - Finding patterns in unlabeled data
3. **Reinforcement Learning** - Learning through interaction and rewards
4. **Neural Networks** - Mimicking human brain structure
5. **Real-world Applications** - From recommendation systems to autonomous vehicles

Get started with popular ML frameworks like TensorFlow and scikit-learn.`,
        author: users[0]._id,
        category: categories[3]._id,
        tags: ["ai", "machine-learning", "python"],
        featuredImage: null,
        isPublished: true,
        views: 3200,
      },
      {
        title: "Productivity Tips for Remote Workers",
        slug: "productivity-remote-workers",
        excerpt:
          "Practical strategies to boost productivity when working from home.",
        content: `Working remotely presents unique challenges. Here are proven strategies:

1. **Create a Dedicated Workspace** - Separate work from personal space
2. **Set Clear Boundaries** - Define work hours and stick to them
3. **Use Time Management Techniques** - Pomodoro, time blocking
4. **Minimize Distractions** - Mute notifications, use focus apps
5. **Regular Breaks** - Step away from your desk periodically
6. **Stay Connected** - Regular communication with your team
7. **Exercise and Movement** - Physical activity boosts productivity

Consistency and discipline are key to remote work success.`,
        author: users[1]._id,
        category: categories[4]._id,
        tags: ["productivity", "remote-work", "lifestyle"],
        featuredImage: null,
        isPublished: true,
        views: 1850,
      },
      {
        title: "Mobile App Security Best Practices",
        slug: "mobile-security",
        excerpt:
          "Essential security measures for protecting your mobile applications.",
        content: `Mobile app security is critical. Key measures include:

1. **Secure Authentication** - Use strong hashing and multi-factor auth
2. **Data Encryption** - Encrypt sensitive data in transit and at rest
3. **API Security** - Validate inputs and use HTTPS
4. **Secure Storage** - Use secure storage mechanisms provided by the OS
5. **Penetration Testing** - Regular security audits
6. **Update Dependencies** - Keep libraries and frameworks updated
7. **Code Obfuscation** - Make reverse engineering harder

Never compromise on security in mobile applications.`,
        author: users[2]._id,
        category: categories[2]._id,
        tags: ["security", "mobile", "best-practices"],
        featuredImage: null,
        isPublished: true,
        views: 2450,
      },
    ]);
    console.log(`Created ${posts.length} posts`);

    console.log("\nDatabase seeding completed successfully!");
    console.log(
      `\nCreated:\n  - ${users.length} users\n  - ${categories.length} categories\n  - ${posts.length} posts`
    );

    // Display sample credentials
    console.log("\nSample Login Credentials:");
    users.forEach((user) => {
      console.log(
        `  Email: ${user.email}, Password: password${users.indexOf(user) + 1}23`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
