const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./utils/database");

const port = 5001;
const app = express();

app.use(express.json());
app.use(cors());

(async () => {
  try {
    await connectToDatabase();

    require("./routes/client.routes")(app);
    require("./routes/account.routes")(app);
    require("./routes/notification.routes")(app);
    require("./routes/packages.routes")(app);
    require("./routes/checkins.routes")(app);

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Failed to start the server", err);
    process.exit(1);
  }
})();
