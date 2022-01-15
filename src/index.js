const app = require("./app.js")

// run the server:
const main = () => {
    app.listen(app.get("port"), () => {
        console.log("Server running on port", app.get("port"));
    })
}

main()