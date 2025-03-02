import Fastify from 'fastify'
import { env } from './env'

const fastify = Fastify({ logger: true })

fastify.get('/', async () => {
  return { message: 'Server is running! 🚀' }
})

fastify.listen({ port: env.PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server is running! 🚀`)
})
