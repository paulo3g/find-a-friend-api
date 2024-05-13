import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements-repository'

import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()

  const createPetUseCase = new CreatePetUseCase(
    orgsRepository,
    petsRepository,
    adoptionRequirementsRepository,
  )

  return createPetUseCase
}
