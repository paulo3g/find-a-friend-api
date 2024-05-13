import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { createPet } from '@/utils/test/create-pet'

describe('Get Pet Details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details', async () => {
    const { token } = await createAndAuthenticateOrg(app)
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
})
