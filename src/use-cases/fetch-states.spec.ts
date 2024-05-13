import { beforeEach, describe, expect, it } from 'vitest'

import { FetchStatesUseCase } from './fetch-states'

describe('Fetch States Use Case', () => {
  let sut: FetchStatesUseCase

  beforeEach(() => {
    sut = new FetchStatesUseCase()
  })

  it('should be able to fetch states in Brazil', async () => {
    const { states } = await sut.execute()

    expect(states).toHaveLength(27)
  })
})
