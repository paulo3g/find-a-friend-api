import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { createPet } from '@/utils/test/create-pet'

describe('Search Pets (e2e)', () => {
  let token: string

  beforeAll(async () => {
    await app.ready()

    const responseAuthenticate = await createAndAuthenticateOrg(app)
    token = responseAuthenticate.token
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const response = await createPet(app, token)

    const getPetResponse = await request(app.server)
      .get(`/pets/${response.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(getPetResponse.statusCode).toEqual(200)
    expect(getPetResponse.body.pet).toEqual(
      expect.objectContaining({
        name: 'pet-01',
      }),
    )
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/pets')

    expect(response.status).toEqual(400)
  })

  it('should be able to search pets by city and age', async () => {
    await createPet(app, token, { age: '1 ano' })

    const response = await request(app.server).get('/pets').query({
      city: 'City 01',
      age: '1 ano',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ age: '1 ano' }),
    ])
  })

  it('should be able to search pets by city and size', async () => {
    await createPet(app, token, { size: 'large' })

    const response = await request(app.server).get('/pets').query({
      city: 'City 01',
      size: 'large',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ size: 'large' }),
    ])
  })

  it('should be able to search pets by city and energy level', async () => {
    await createPet(app, token, { energyLevel: 'high' })

    const response = await request(app.server).get('/pets').query({
      city: 'City 01',
      energyLevel: 'high',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ energy_level: 'high' }),
    ])
  })

  it('should be able to search pets by city and environment', async () => {
    await createPet(app, token, { environment: 'outdoors' })

    const response = await request(app.server).get('/pets').query({
      city: 'City 01',
      environment: 'outdoors',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({ environment: 'outdoors' }),
    ])
  })
})
