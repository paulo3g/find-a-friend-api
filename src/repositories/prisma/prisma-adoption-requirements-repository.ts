import { prisma } from '@/lib/prisma'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async add(data: string[], petId: string) {
    await prisma.adoptionRequirements.createMany({
      data: data.map((requirement) => {
        return {
          title: requirement,
          pet_id: petId,
        }
      }),
    })

    return null
  }
}
