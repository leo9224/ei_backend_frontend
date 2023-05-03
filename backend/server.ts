const app = require("./app");
const port = process.env.API_PORT

const server = app.listen(port, () => {
    console.log(`API listening on port ${port}`)
})