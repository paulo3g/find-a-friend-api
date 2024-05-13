import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

const searchPetsParamsSchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energyLevel: z.string().optional(),
  environment: z.string().optional(),
})

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const { city, age, size, energyLevel, environment } =
    searchPetsParamsSchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetsUseCase.execute({
      city,
      age,
      size,
      energyLevel,
      environment,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ message: err.format() })
    }

    throw err
  }
}
