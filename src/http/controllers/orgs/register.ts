import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrg } from '../../../use-cases/factories/make-register-org'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
  })

  const orgPayload = createOrgBodySchema.parse(request.body)

  const registerOrgUseCase = makeRegisterOrg()

  const { org } = await registerOrgUseCase.execute(orgPayload)

  return reply.status(201).send(org)
}
