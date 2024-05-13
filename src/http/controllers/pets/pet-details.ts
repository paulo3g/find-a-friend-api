import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'

const petDetailsParamsSchema = z.object({
  petId: z.string(),
})

export async function petDetails(request: FastifyRequest, reply: FastifyReply) {
  const { petId } = petDetailsParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()

  try {
    const { pet } = await getPetDetailsUseCase.execute({ petId })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ message: err.format() })
    }

    throw err
  }
}
