import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/orgs').send({
    name: 'Org 01',
    email: 'org@org.com.br',
    whatsapp: '1234567890',
    password: '123456',
    passwordConfirm: '123456',
    cep: '12345678',
    state: 'State 01',
    city: 'City 01',
    neighborhood: 'Neighborhood 01',
    street: 'Street 01',
    latitude: 1,
    longitude: 1,
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'org@org.com.br',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
