const app = require('./app')
const { PORT, MONGODB_URI } = require('./utils/config')

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
