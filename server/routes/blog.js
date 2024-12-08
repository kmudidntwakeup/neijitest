const express = require("express");
const router = express.Router();

// Sample blog data (in a real app, this would come from a database)
const blogs = [
  {
    title: "Welcome to Neiji",
    content: "This is our first blog post about Neiji's journey."
  },
  {
    title: "Building Connections",
    content: "Learn how Neiji is helping people build meaningful connections."
  }
];

router.get("/", (req, res) => {
    res.render("blog", { 
        title: "Neiji Blog",
        blogs: blogs
    });
});

module.exports = router;