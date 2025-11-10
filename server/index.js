import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from './inngest/index.js'
import {serve} from 'inngest/express'

const app = express()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())
app.use('/api/inngest',serve({client: inngest,functions,signingKey:process.env.INNGEST_SIGNING_KEY}))

app.get('/', (req, res) => {
  res.send('Server is live !')
})

const port = process.env.SERVER_PORT 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
