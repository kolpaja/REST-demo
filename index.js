const express = require("express");
const app = express();
var methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  { id: uuidv4(), username: "Tod", comment: "lol so funny!" },
  { id: uuidv4(), username: "sam", comment: "that is the first time seeing!" },
  { id: uuidv4(), username: "ana", comment: "lol you so  funny tod!" },
  { id: uuidv4(), username: "lina", comment: "plz delete!" },
];
app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const foundcomment = comments.find((c) => c.id === id);
  foundcomment.comment = newComment;
  res.redirect("/comments");
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter(c => c.id !== id);
  res.redirect("/comments")
})
app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  res.redirect("/comments");
});

app.listen(3030, () => console.log("listening from port 3030"));
