import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { petDetails } from './pet-details'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', search)
  app.get('/pets/:petId', petDetails)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
