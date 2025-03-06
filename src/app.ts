import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { petsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { env } from './env'

export const app = Fastify()

/* JWT */
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issue: error.format() })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error.' })
})
