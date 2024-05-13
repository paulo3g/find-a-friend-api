import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'

import { OrgNotFoundError } from './errors/org-not-found.error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energyLevel: string
  environment: string
  orgId: string
  adoptionRequirements: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
    private adoptionRequirementsRepository: AdoptionRequirementsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energyLevel,
    environment,
    orgId,
    adoptionRequirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      environment,
      org_id: orgId,
    })

    await this.adoptionRequirementsRepository.add(adoptionRequirements, pet.id)

    return { pet }
  }
}
