import { AdoptionRequirements } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  add(data: string[], petId: string): Promise<AdoptionRequirements[] | null>
}
