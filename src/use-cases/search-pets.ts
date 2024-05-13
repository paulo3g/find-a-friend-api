import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    environment,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      size,
      energyLevel,
      environment,
    })

    return { pets }
  }
}
