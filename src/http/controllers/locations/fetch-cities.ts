import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { FetchCitiesByStateUseCase } from '@/use-cases/fetch-cities-by-state'

const fetchCitiesParamsSchema = z.object({
  UF: z.string(),
})

export async function fetchCities(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { UF } = fetchCitiesParamsSchema.parse(request.params)

  const fetchCitiesByStateUseCase = new FetchCitiesByStateUseCase()

  try {
    const { cities } = await fetchCitiesByStateUseCase.execute({ UF })

    return reply.status(200).send({ cities })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ message: err.format() })
    }

    throw err
  }
}
