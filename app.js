const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

// data parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Library API",
      version: "1.0.0",
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// * Swagger documentation All Books

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 */

app.get("/books", (req, res) => {
  res.send([
    {
      isbn: "9781781100486",
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      publisher: "Scholastic",
    },
  ]);
});

// * Swagger documentation Post

/**
 * @swagger
 * /book:
 *   post:
 *     description: Create a new book
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: Book object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *       400:
 *         description: Bad request, invalid input data
 */

// ? Post will have the path of book with an echo back
app.post("/book", (req, res) => {
  const title = req.body.title;
  res.send({ title });
});

// ? Test to make sure server is up and running
// app.get("/", (req, res) => {
//   res.send("Hello World! Let's GOOOO!!!!");
// });

app.listen(3000, () => {
  console.log("Running on port 3000");
});
