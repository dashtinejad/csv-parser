import parseCSV from './csv'

describe('Tests', () => {
  it("empty", () => {
    const input = ""
    const output = [[]]

    expect(parseCSV(input)).toMatchObject(output);
  })

  it("single value", () => {
    const input = "1"
    const output = [['1']]

    expect(parseCSV(input)).toMatchObject(output);
  })

  it("multi values", () => {
    const input = "1,2,3"
    const output = [['1', '2', '3']]

    expect(parseCSV(input)).toMatchObject(output);
  })
})