import parseCSV from './csv'


describe('Basic CSV Functionality', () => {
  it('empty', () => {
    const input = ''
    const output = [['']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('empty values', () => {
    const input = ',,'
    const output = [['', '', '']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('single value', () => {
    const input = '1'
    const output = [['1']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('single complex value', () => {
    const input = 'one'
    const output = [['one']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('multi values', () => {
    const input = '1,2,3'
    const output = [['1', '2', '3']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('multi complex values', () => {
    const input = 'one,two,3,four'
    const output = [['one', 'two', '3', 'four']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('multi lines', () => {
    const input = '1\n2\n3'
    const output = [['1'], ['2'], ['3']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('multi complex lines', () => {
    const input = '1,2,three\none\ntwo\n3\nfour'
    const output = [['1', '2', 'three'], ['one'], ['two'], ['3'], ['four']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})

describe('Quoted Values', () => {
  it('simple quote', () => {
    const input = '"one"'
    const output = [["one"]]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('simple multi quote values', () => {
    const input = '"one",2,"three"'
    const output = [["one", '2', 'three']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('quote with new lines', () => {
    const input = '"one"\n"two"'
    const output = [['one'], ['two']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('multi quote with new lines', () => {
    const input = '1,"two",3,"four"\n"one",2,"three",4'
    const output = [['1', 'two', '3', 'four'], ['one', '2', 'three', '4']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('quote with new lines inside', () => {
    const input = '"one\ntwo"'
    const output = [['one\ntwo']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})


describe('Nested Quoted Values', () => {
  it('simple nested quote', () => {
    const input = '"one \"\"two\"\" three'
    const output = [['one "two" three']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})