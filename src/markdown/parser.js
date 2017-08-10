import { Parser } from 'commonmark'

const createParser = () => {
  return new Parser()
}

export default {
  parser: null,

  parse(markdown) {
    if (!this.parser) {
      this.parser = createParser()
    }
    return this.parser.parse(markdown)
  },
}
