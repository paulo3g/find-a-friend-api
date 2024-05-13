import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      name: 'Org 01',
      email: 'org@org.com.br',
      whatsapp: '1234567890',
      password_hash: await hash('123456', 6),
      cep: '12345678',
      state: 'State 01',
      city: 'City 01',
      neighborhood: 'Neighborhood 01',
      street: 'Street 01',
      latitude: 1,
      longitude: 1,
    })

    const { org } = await sut.execute({
      email: 'org@org.com.br',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'Org 01',
      email: 'org@org.com.br',
      whatsapp: '1234567890',
      password_hash: await hash('123456', 6),
      cep: '12345678',
      state: 'State 01',
      city: 'City 01',
      neighborhood: 'Neighborhood 01',
      street: 'Street 01',
      latitude: 1,
      longitude: 1,
    })

    await expect(() =>
      sut.execute({
        email: 'org@org.com.br',
        password: '121212',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
