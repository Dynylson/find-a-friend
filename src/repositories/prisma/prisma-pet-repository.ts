import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import prisma from '../../lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async register(data: Prisma.PetCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
