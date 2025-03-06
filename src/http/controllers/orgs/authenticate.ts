import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOrg } from '../../../use-cases/factories/make-authenticate-org'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateOrgBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const orgPayload = authenticateOrgBodySchema.parse(request.body)

  const authenticateOrgUseCase = makeAuthenticateOrg()

  const { org } = await authenticateOrgUseCase.execute(orgPayload)

  return reply.status(201).send(org)
}
