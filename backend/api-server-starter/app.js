require('dotenv').config()
const express = require("express");
const app = express();
const morgan = require("morgan");
//const userRouter = require("./routes/userRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const userRouter = require("./routes/userfRouter");


// Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

connectDB();

// Use the userRouter for all /users routes
// app.use("/api/users", userRouter);
app.use('/api/jobs', jobRoutes);
//app.use('/api', userRouter); Michael
app.use("/api/users", userRouter); //Farnaz
app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
