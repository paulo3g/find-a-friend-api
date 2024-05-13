import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

import { CreatePetUseCase } from './create-pet'
import { OrgNotFoundError } from './errors/org-not-found.error'

describe('Create Pet Use Case', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()

    sut = new CreatePetUseCase(
      orgsRepository,
      petsRepository,
      adoptionRequirementsRepository,
    )
  })

  it('should be able to create a new pet', async () => {
    const org = await orgsRepository.create({
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

    const { pet } = await sut.execute({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energyLevel: 'low',
      environment: 'indoor',
      adoptionRequirements: ['requirement-01', 'requirement-02'],
      orgId: org.id,
    })

    expect(petsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    const pet = {
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energyLevel: 'low',
      environment: 'indoor',
      adoptionRequirements: ['requirement-01', 'requirement-02'],
      orgId: 'non-existing-org-id',
    }

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
