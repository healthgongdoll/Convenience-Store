const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
//import routes
const userRoutes = require("./app/routes/user.routes");
const itemRoutes = require("./app/routes/catalog.routes");
const shoppingcartRoutes = require("./app/routes/shoppingcart.routes");
const orderRoutes = require("./app/routes/order.routes");
const orderedItemRoutes = require("./app/routes/orderedItem.routes");
const adminRoutes = require("./app/routes/admin.routes");
// parse request data content type application
app.use(bodyParser.urlencoded({ extended: false }));

//parse request data content type application/json
app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

//create user routes
app.use("/api/user", userRoutes);
app.use("/api/item", itemRoutes);
app.use("/api/shoppingcart", shoppingcartRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/orderedItem",orderedItemRoutes);
app.use("/api/admin",adminRoutes);

app.listen(9000, () => {
  console.log(`Server is running on port 9000.`);
});
