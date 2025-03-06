import { UserRepository } from '../repositories/user-repository'
import { compare } from 'bcryptjs'
import { OrgRepository } from '../repositories/org-repository'
import { Org } from '@prisma/client'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(
    private orgRepository: OrgRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const org = await this.orgRepository.findByUserId(user.id)

    if (!org) {
      throw new Error('Org not found.')
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new Error('Invalid credentials.')
    }

    return {
      org,
    }
  }
}
