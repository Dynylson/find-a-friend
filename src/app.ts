import fastify from 'fastify'
import { petsRoutes } from './http/controllers/pets/routes'
import { ZodError } from 'zod'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify()

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
