import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Get Pet Details Use Case', () => {
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetDetailsUseCase

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create({
      name: 'pet 01',
      about: 'Lorem ipsum dolor sit ament.',
      age: '12 anos',
      size: 'large',
      energy_level: 'low',
      environment: 'indoor',
      org_id: 'org-id-01',
    })

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.name).toEqual('pet 01')
  })

  it('should not be able to get pet details with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
