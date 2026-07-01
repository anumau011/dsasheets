import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import NodeCache from "node-cache";
import { prisma } from "./lib/prisma.js";
import bcrypt from "bcrypt"
import { generateToken } from "./lib/jwt.js";
import authenticate from "./middleware.js";
import cors from "cors";
const cache = new NodeCache({stdTTL: 3600});
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }
));

app.use(express.json());

app.get('/', (req, res) => {
  res.send("API is running...");
});

app.get('/api/questions', async (req, res) => {
  // Sample data for questions

  const cached = cache.get("questions");

  if (cached) {
    return res.json(cached);
  }

  const questions = await prisma.step.findMany({
    include: {
      subSteps: {
        include: {
          topics: true,
        },
      },
    },
  });

  cache.set("questions", questions);

  res.json(questions);
})

app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required" });
  }   

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const token = generateToken(user);
  res.json({ token });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user);
  res.json({ token });
});

app.post('/api/mark-complete',authenticate, async (req, res) => {
  const { questionId:topicId } = req.body;
  const userId = req.user.id;

  const userProgress = await prisma.userProgress.upsert({
    where: {
      userId_topicId: {
        userId,
        topicId
      }
    },
    update: {
      isCompleted: true
    },
    create: {
      userId,
      topicId,
      isCompleted: true
    }
  });

  res.json(userProgress);
});

app.post('/api/mark-undo', authenticate, async (req, res) => {
  const { questionId:topicId } = req.body;
  const userId = req.user.id;

  const userProgress = await prisma.userProgress.upsert({
    where: {
      userId_topicId: {
        userId,
        topicId
      }
    },
    update: {
      isCompleted: false
    },
    create: {
      userId,
      topicId,
      isCompleted: false
    }
  });

  res.json({success: true, message: "Marked as not completed"});
});

app.post('/api/me', authenticate, async (req, res) => {
  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      name: true, 
      email: true,
    }
  });
  res.json(user);
});


app.get('/api/user-progress', authenticate, async (req, res) => {
  const userId = req.user.id;
  const userProgress = await prisma.userProgress.findMany({
    where: {
      userId,
      isCompleted:true
    },
    select: {
      topicId: true,
      isCompleted: true
    }
  });
  res.json(userProgress);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});