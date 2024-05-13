import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { SearchPetsUseCase } from './search-pets'

describe('Search Pets Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)

    await orgsRepository.create({
      id: 'org-id-01',
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
  })

  it('should be able to search pets by city', async () => {
    const org = await orgsRepository.create({
      name: 'Org 01',
      email: 'org@org.com.br',
      whatsapp: '1234567890',
      password_hash: await hash('123456', 6),
      cep: '12345678',
      state: 'State 01',
      city: 'City 02',
      neighborhood: 'Neighborhood 01',
      street: 'Street 01',
      latitude: 1,
      longitude: 1,
    })

    await petsRepository.create({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 02',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: org.id,
    })

    const { pets } = await sut.execute({ city: 'City 02' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet 02', org_id: org.id }),
    ])
  })

  it('should be able to search pets by city and age', async () => {
    await petsRepository.create({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '1 ano',
      size: 'small',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 02',
      about: 'Lorem ipsum dolor sit ament.',
      age: '5 anos',
      size: 'medium',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 03',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    const { pets } = await sut.execute({ city: 'City 01', age: '12 anos' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet 03', age: '12 anos' }),
    ])
  })

  it('should be able to search pets by city and size', async () => {
    await petsRepository.create({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'small',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 02',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'medium',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 03',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    const { pets } = await sut.execute({ city: 'City 01', size: 'large' })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet 03', size: 'large' }),
    ])
  })

  it('should be able to search pets by city and energyLevel', async () => {
    await petsRepository.create({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 02',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'medium',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 03',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'high',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    const { pets } = await sut.execute({
      city: 'City 01',
      energyLevel: 'medium',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet 02', energy_level: 'medium' }),
    ])
  })

  it('should be able to search pets by city and environment', async () => {
    await petsRepository.create({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    await petsRepository.create({
      name: 'pet 02',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'medium',
      environment: 'outdoor',
      org_id: 'org-id-01',
    })

    const { pets } = await sut.execute({
      city: 'City 01',
      environment: 'outdoor',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'pet 02', environment: 'outdoor' }),
    ])
  })
})
