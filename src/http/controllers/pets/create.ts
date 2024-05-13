import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

const createBodySchema = z.object({
  name: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.enum(['small', 'medium', 'large']),
  energyLevel: z.enum(['low', 'medium', 'high']),
  environment: z.enum(['indoors', 'outdoors']),
  adoptionRequirements: z.array(z.string()),
})

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const body = createBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  const orgId = request.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, orgId })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ message: err.format() })
    }

    throw err
  }
}
