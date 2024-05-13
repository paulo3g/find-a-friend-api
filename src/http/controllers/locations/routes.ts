import { FastifyInstance } from 'fastify'

import { fetchStates } from './fetch-states'
import { fetchCities } from './fetch-cities'

export async function locationRoutes(app: FastifyInstance) {
  app.get('/location/states', fetchStates)
  app.get('/location/cities/:UF', fetchCities)
}
