import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPet } from '../../../use-cases/factories/make-register-pet'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    breed: z.string(),
    height: z.number(),
    mood: z.enum(['HAPPY', 'SAD', 'CALM', 'NERVOUS', 'ANGRY']),
    birth_date: z.string().datetime(),
    color: z.string(),
    weight: z.number(),
    addressId: z.string().uuid().optional(),
    orgId: z.string().uuid().optional(),
  })

  const petPayload = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeRegisterPet()

  const { pet } = await createPetUseCase.execute({
    ...petPayload,
    birth_date: new Date(petPayload.birth_date),
  })

  return reply.status(201).send(pet)
}
