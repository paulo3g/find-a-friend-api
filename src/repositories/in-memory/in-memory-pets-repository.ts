import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { FindAllParams, PetsRepository } from '../pets-repository'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository?: InMemoryOrgsRepository) {}

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findAll(params: FindAllParams) {
    const orgsByCity = this.orgsRepository?.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => orgsByCity?.some((org) => org.id === item.org_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energyLevel ? params.energyLevel === item.energy_level : true,
      )
      .filter((item) =>
        params.environment ? params.environment === item.environment : true,
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
