import axios from 'axios'

class ApiServiceClass {
  private URL = 'https://tokens.swap.coffee/api/v1/tokens'

  getBlockchains() {
    return axios.get(`${this.URL}/blockchains`)
  }

  getTokens(id: number) {
    return axios.get(`${this.URL}/${id}/tokens`)
  }
}

export const ApiService = new ApiServiceClass()
