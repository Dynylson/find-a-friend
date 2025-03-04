import { Org } from '@prisma/client'
import { OrgRepository } from '../repositories/org-repository'
import { hash } from 'bcryptjs'
import { UserRepository } from '../repositories/user-repository'

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
  constructor(
    private orgRepository: OrgRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    phone,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const emailAlreadyUsed = await this.userRepository.findByEmail(email)

    if (emailAlreadyUsed) {
      throw new Error('E-mail already in use.') // TODO: configure global error handler
    }

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
