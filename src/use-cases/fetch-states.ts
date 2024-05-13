import BrasilApi from 'brasilapi-js'

interface State {
  id: number
  UF: string
  name: string
}

interface FetchStatesUseCaseResponse {
  states: State[]
}

export class FetchStatesUseCase {
  constructor() {}

  async execute(): Promise<FetchStatesUseCaseResponse> {
    const { data = [] } = await BrasilApi.ibge.state.getAll()

    const states = data.map((state) => ({
      id: state.id,
      UF: state.sigla,
      name: state.nome,
    }))

    return { states }
  }
}
