import { User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import prisma from '../../lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
