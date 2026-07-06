const app = require('./app')
require('dotenv').config()

const port = process.env.PORT;

app.listen(port || 3001, () => {
    console.log(`App running on port ${port || 3001}`)
})