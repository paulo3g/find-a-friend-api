import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { FindAllParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
        age: params.age,
        size: params.size,
        energy_level: params.energyLevel,
        environment: params.environment,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
