require('dotenv').config();
const express = require('express');
const CauseRoute = require('./routes/Cause.route.js');
const ContributionRoute =require('./routes/Contribution.route.js');


const { testDatabaseConnection, syncDatabase, closeDatabaseConnection } = require("./config/dbConnect");

(async () => {
  // Test the connection
  await testDatabaseConnection();

  // Sync models with the database
  await syncDatabase();

  // Graceful shutdown
  process.on("SIGINT", async () => {
    await closeDatabaseConnection();
    process.exit(0);
  });
})();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',CauseRoute);
app.use('/api',ContributionRoute);

app.get('/',(req,res)=>{
  res.send('HomePage');
})

const port= process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

