import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'

const registerBodySchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
    cep: z.string().min(8),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match.",
    path: ['passwordConfirm'],
  })

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const body = registerBodySchema.parse(request.body)

  const registerOrgUseCase = makeRegisterOrgUseCase()

  try {
    await registerOrgUseCase.execute(body)

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ message: err.format() })
    }

    throw err
  }
}
