const express = require("express");
const userRouter = require("./routes/userRoutes")
const app = express();
app.use(express.json());


app.use("/users",userRouter );
app.get("/", (req, res)=>{
    res.send("Hello User.");
});





const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
