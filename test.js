import parseCSV from './csv'

describe('Basic One Row', () => {
  it('empty', () => {
    const input = ''
    const output = [['']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('single 1 character value', () => {
    const input = '1'
    const output = [['1']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('single multi characters value', () => {
    const input = 'hello'
    const output = [['hello']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('multi single character value', () => {
    const input = '1,2,3'
    const output = [['1', '2', '3']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('complex multi character value', () => {
    const input = 'hello,world,mojtaba'
    const output = [['hello','world','mojtaba']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})

describe('Basic Multi Rows', () => {
  it('basic multi rows', () => {
    const input = 'aa\nbb'
    const output = [['aa'], ['bb']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('complex multi rows', () => {
    const input = 'hello,world,aa\nbb,javascript'
    const output = [['hello', 'world', 'aa'], ['bb', 'javascript']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})

describe('Basic Quoted Fields', () => {
  it('basic quoted single value', () => {
    const input = '"one"'
    const output = [['one']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('basic quoted multi values (quoted values at the beginning and end)', () => {
    const input = '"one",2,"two"'
    const output = [['one', '2', 'two']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('basic quoted multi values (no quoted at the end)', () => {
    const input = '"one",2'
    const output = [['one', '2']]

    expect(parseCSV(input)).toMatchObject(output)
  })

  it('basic quoted multi values (no quoted at the beginning)', () => {
    const input = '1,"two"'
    const output = [['1', 'two']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})

describe('Complex Quoted Fields', () => {
  it('separator inside value', () => {
    const input = '"one,two"'
    const output = [['one,two']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})

describe('Nested quoted fields', () => {
  it('newline inside value', () => {
    const input = '"one ""two"" three"'
    const output = [['one "two" three']]

    expect(parseCSV(input)).toMatchObject(output)
  })
})
