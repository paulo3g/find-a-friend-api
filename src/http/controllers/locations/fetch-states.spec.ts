import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Fetch States (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch states', async () => {
    const response = await request(app.server).get('/location/states').send()

    expect(response.status).toEqual(200)
  })
})
