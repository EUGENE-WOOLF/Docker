import express from "express";
import mongoose from "mongoose";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "public")));

// Connect to MongoDB
mongoose
  .connect("mongodb://user:password@localhost:27017/testDB?authSource=admin")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ===== Schemas =====
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);

// ===== Routes =====
// Add user
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add project
app.post("/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List projects with owner info
app.get("/projects", async (req, res) => {
  const projects = await Project.find().populate("owner");
  res.json(projects);
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
