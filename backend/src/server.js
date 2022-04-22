const app = require("./app");
const config = require("./config");

app.listen(config.EXPRESS_PORT, () => {
    console.log(`app started on port ${config.EXPRESS_PORT}`)
})