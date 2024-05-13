import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Fetch Cities By State (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch cities by state in Brazil', async () => {
    const response = await request(app.server).get('/location/cities/BA').send()

    expect(response.status).toEqual(200)
  })
})
