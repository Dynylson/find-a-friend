import { Org } from '@prisma/client'
import { OrgRepository } from '../repositories/org-repository'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const hashedPassword = await hash(password, 10)

    const org = await this.orgRepository.register({
      name,
      email,
      password_hash: hashedPassword,
      phone,
    })

    return {
      org,
    }
  }
}
