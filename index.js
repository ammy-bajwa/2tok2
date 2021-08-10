require("dotenv").config()
const Server = require("./app")

const begin = async () => {
  await new Server(process.env.EXPRESS_PORT || 3000).start()
  console.log(`Server running in --- ${process.env.NODE_ENV} --- on port ${process.env.EXPRESS_PORT || 3000}`)
}

begin()