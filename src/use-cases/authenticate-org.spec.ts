/* eslint-disable */
import { beforeEach, describe, expect, it, Mocked, vi } from 'vitest'
import { AuthenticateOrgUseCase } from './authenticate-org'
import { UserRepository } from '../repositories/user-repository'
import { OrgRepository } from '../repositories/org-repository'

let orgRepository: OrgRepository
let userRepository: UserRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org', () => {
  beforeEach(() => {
    orgRepository = {
      findByUserId: vi.fn(),
      register: vi.fn(),
    }

    userRepository = {
      findByEmail: vi.fn(),
    }

    sut = new AuthenticateOrgUseCase(orgRepository, userRepository)
  })

  it('should be possible authenticate as an org', async () => {
    // Arrange
    (userRepository as Mocked<UserRepository>).findByEmail.mockResolvedValue({
      id: '64abb7ef-511a-464f-ab5f-97184d94b11a',
      name: 'Org 1',
      email: 'org@email.com',
      password_hash:
        '$2a$12$T9z/20pstham5T5A9RUEp.RNz3aMvFaR0KiqUNs2LetfkHhCVcmSG', // 1234
      created_at: new Date(),
      updated_at: new Date(),
      role: 'MEMBER',
    });

    (orgRepository as Mocked<OrgRepository>).findByUserId.mockResolvedValue({
      id: '64abb7ef-511a-464f-ab5f-97184d94b11a',
      user_id: '64abb7ef-511a-464f-ab5f-97184d94b11a',
      phone: '87999999999',
      created_at: new Date(),
      updated_at: new Date(),
      address_id: '69abb7ef-511a-464f-ab5f-97184d94b11a',
    });

    // Act
    const result = await sut.execute({
      email: 'org@email.com',
      password: '1234',
    })

    // Assert
    expect(result.org).toEqual({
      id: '64abb7ef-511a-464f-ab5f-97184d94b11a',
      user_id: '64abb7ef-511a-464f-ab5f-97184d94b11a',
      phone: '87999999999',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      address_id: '69abb7ef-511a-464f-ab5f-97184d94b11a',
    })
  })
})
