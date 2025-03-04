import { Org, Prisma } from '@prisma/client'
import { OrgRepository } from '../org-repository'
import prisma from '../../lib/prisma'

export class PrismaOrgRepository implements OrgRepository {
  async register(
    data: Prisma.UserCreateInput & Pick<Prisma.OrgCreateInput, 'phone'>,
  ): Promise<Org> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
      },
    })

    const org = await prisma.org.create({
      data: {
        phone: data.phone,
        user_id: user.id,
      },
    })

    return org
  }
}
