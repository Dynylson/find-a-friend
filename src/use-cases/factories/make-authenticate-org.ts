import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'
import { AuthenticateOrgUseCase } from '../authenticate-org'

export function makeAuthenticateOrg() {
  const orgRepository = new PrismaOrgRepository()
  const userRepository = new PrismaUserRepository()
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(
    orgRepository,
    userRepository,
  )

  return authenticateOrgUseCase
}
