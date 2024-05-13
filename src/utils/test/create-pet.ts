import { FastifyInstance } from 'fastify'
import request from 'supertest'

type Overwrite = {
  age?: string
  size?: string
  energyLevel?: string
  environment?: string
}

export async function createPet(
  app: FastifyInstance,
  token: string,
  overwrite?: Overwrite,
) {
  const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'pet-01',
      about: 'Lorem ipsum',
      age: overwrite?.age ? overwrite.age : '15 anos',
      size: overwrite?.size ? overwrite.size : 'small',
      energyLevel: overwrite?.energyLevel ? overwrite.energyLevel : 'low',
      environment: overwrite?.environment ? overwrite.environment : 'indoors',
      adoptionRequirements: ['requirement-01', 'requirement-02'],
    })

  return response
}
