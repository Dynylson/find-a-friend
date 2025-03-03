import { Pet } from '@prisma/client'
import { PetRepository } from '../repositories/pet-repository'

interface RegisterPetPetUseCaseRequest {
  name: string
  city: string
  breed: string
  height: number
  mood: 'HAPPY' | 'SAD' | 'CALM' | 'NERVOUS' | 'ANGRY'
  birth_date: Date
  color: string
  weight: number
  addressId?: string
  orgId?: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(
    props: RegisterPetPetUseCaseRequest,
  ): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.register(props)

    return {
      pet,
    }
  }
}
