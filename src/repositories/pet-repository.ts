import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  register(data: Prisma.PetCreateInput): Promise<Pet>
}
