import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { RegisterOrgUseCase } from './register-org'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

describe('Register Org Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let sut: RegisterOrgUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to create a new org', async () => {
    const { org } = await sut.execute({
      name: 'Org 01',
      email: 'org@org.com.br',
      whatsapp: '1234567890',
      password: '123456',
      cep: '12345678',
      state: 'State 01',
      city: 'City 01',
      neighborhood: 'Neighborhood 01',
      street: 'Street 01',
      latitude: 1,
      longitude: 1,
    })

    expect(orgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new org with an already used email', async () => {
    const org = {
      name: 'Org 01',
      email: 'org@org.com.br',
      whatsapp: '1234567890',
      password: '123456',
      cep: '12345678',
      state: 'State 01',
      city: 'City 01',
      neighborhood: 'Neighborhood 01',
      street: 'Street 01',
      latitude: 1,
      longitude: 1,
    }

    await sut.execute(org)

    await expect(sut.execute(org)).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash password upon creation', async () => {
    const { org } = await sut.execute({
      name: 'Org 01',
      email: 'org@org.com.br',
      whatsapp: '1234567890',
      password: '123456',
      cep: '12345678',
      state: 'State 01',
      city: 'City 01',
      neighborhood: 'Neighborhood 01',
      street: 'Street 01',
      latitude: 1,
      longitude: 1,
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
