require("dotenv").config()
const Server = require("./app")

const begin = async () => {
  await new Server(process.env.PORT || 3000).start()
  console.log(`Server running in --- ${process.env.NODE_ENV || 'Local'} --- on port ${process.env.PORT || 3000}`)
}

begin()