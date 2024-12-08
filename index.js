const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
const indexRoutes = require("./server/routes/index");
const blogRoutes = require("./server/routes/blog");

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});