import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrg() {
  const orgRepository = new PrismaOrgRepository()
  const userRepository = new PrismaUserRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(
    orgRepository,
    userRepository,
  )

  return registerOrgUseCase
}
