import { PrismaOrgRepository } from '../../repositories/prisma/prisma-org-repository'
import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrg() {
  const orgRepository = new PrismaOrgRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository)

  return registerOrgUseCase
}
