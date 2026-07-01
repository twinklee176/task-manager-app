const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let tasks = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {

const taskItems = tasks
.map(
(task,index)=>`
<li>
${task}
<form action="/delete-task" method="POST" style="display:inline;">
<input type="hidden" name="index" value="${index}">
<button class="delete-btn">Delete</button>
</form>
</li>`
).join("");

res.send(`
<!DOCTYPE html>
<html>

<head>

<title>Task Manager</title>

<link rel="stylesheet" href="styles.css">

</head>

<body>

<div class="container">

<h1>Task Manager</h1>

<form action="/add-task" method="POST">

<input
type="text"
name="task"
placeholder="Enter Task"
required>

<button>Add Task</button>

</form>

<ul>

${taskItems}

</ul>

</div>

</body>

</html>
`);

});

app.post("/add-task",(req,res)=>{

tasks.push(req.body.task);

res.redirect("/");

});

app.post("/delete-task",(req,res)=>{

tasks.splice(req.body.index,1);

res.redirect("/");

});

app.listen(80,()=>{

console.log("Server running on port 80");

});
