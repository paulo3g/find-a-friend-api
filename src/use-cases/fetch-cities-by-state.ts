import BrasilApi from 'brasilapi-js'

import { InvalidUFInitialsError } from './errors/invalid-UF-initials-error'

interface FetchCitiesByStateUseCaseRequest {
  UF: string
}

interface City {
  name: string
}

interface FetchCitiesByStateUseCaseResponse {
  cities: City[]
}

export class FetchCitiesByStateUseCase {
  constructor() {}

  async execute({
    UF,
  }: FetchCitiesByStateUseCaseRequest): Promise<FetchCitiesByStateUseCaseResponse> {
    try {
      const { data } = await BrasilApi.ibge.country.getBy(UF)

      const cities = data.map((city) => ({
        name: city.nome,
      }))

      return { cities }
    } catch (error) {
      throw new InvalidUFInitialsError()
    }
  }
}
