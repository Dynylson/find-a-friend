import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  register(
    data: Prisma.UserCreateInput & Pick<Prisma.OrgCreateInput, 'phone'>,
  ): Promise<Org>
}
