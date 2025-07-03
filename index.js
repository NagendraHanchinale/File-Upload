const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const express = require("express");
const app = express();


const connectDb = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary")

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: '/tmp/'
}))
require("dotenv").config();

const PORT = process.env.PORT || 3000;

connectDb();
cloudinaryConnect();


const upload = require("./routes/FileUpload");

app.use("/api/v1/upload",upload);

// app.get("/", (req, res) => {
//     res.json({
//         message: "<h1>hello</h1>"
//     });
// });


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
