import { Org, Prisma } from '@prisma/client'

export interface OrgRepository {
  findByUserId(id: string): Promise<Org | null>
  register(
    data: Prisma.UserCreateInput & Pick<Prisma.OrgCreateInput, 'phone'>,
  ): Promise<Org>
}
