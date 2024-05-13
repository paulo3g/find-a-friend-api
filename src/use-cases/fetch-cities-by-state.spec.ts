import { beforeEach, describe, expect, it } from 'vitest'

import { FetchCitiesByStateUseCase } from './fetch-cities-by-state'
import { InvalidUFInitialsError } from './errors/invalid-UF-initials-error'

describe('Fetch Cities By State Use Case', () => {
  let sut: FetchCitiesByStateUseCase

  beforeEach(() => {
    sut = new FetchCitiesByStateUseCase()
  })

  it('should be able to fetch cities by state in Brazil', async () => {
    const { cities } = await sut.execute({ UF: 'BA' })

    expect(cities).toHaveLength(417)
  })

  it('should not be able to fetch cities by state with wrong UF', async () => {
    await expect(() => sut.execute({ UF: 'ABC' })).rejects.toBeInstanceOf(
      InvalidUFInitialsError,
    )
  })
})
