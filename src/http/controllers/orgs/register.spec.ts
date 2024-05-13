import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
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

    expect(response.statusCode).toEqual(201)
  })
})
