import { FastifyReply, FastifyRequest } from 'fastify'

import { FetchStatesUseCase } from '@/use-cases/fetch-states'

export async function fetchStates(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchStatesUseCase = new FetchStatesUseCase()

  const { states } = await fetchStatesUseCase.execute()

  return reply.status(200).send({ states })
}
