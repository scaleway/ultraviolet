import { Col, Grid, Row } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Grid', () => {
  describe('Grid', () => {
    test('renders correctly with default values', () =>
      shouldMatchEmotionSnapshot(<Grid>Sample Grid</Grid>))
    test('renders correctly when fluid', () =>
      shouldMatchEmotionSnapshot(<Grid fluid>Sample Grid</Grid>))
    test('renders correctly with custom gutter', () =>
      shouldMatchEmotionSnapshot(<Grid gutter={4}>Sample Grid</Grid>))
  })

  describe('Row', () => {
    test('renders correctly with default values', () =>
      shouldMatchEmotionSnapshot(<Row>Sample Row</Row>))
    test('renders correctly with custom gutter', () =>
      shouldMatchEmotionSnapshot(<Row gutter={4}>Sample Row</Row>))
  })

  describe('Col', () => {
    test('renders correctly with default values', () =>
      shouldMatchEmotionSnapshot(<Col>Sample Col</Col>))
    test('renders correctly with custom gutter', () =>
      shouldMatchEmotionSnapshot(<Col gutter={4}>Sample Col</Col>))
    test('renders correctly with responsive as number', () =>
      shouldMatchEmotionSnapshot(<Col medium={4}>Sample Col</Col>))
    test('renders correctly with responsive as auto', () =>
      shouldMatchEmotionSnapshot(<Col medium="auto">Sample Col</Col>))
    test('renders correctly with responsive as bool', () =>
      shouldMatchEmotionSnapshot(<Col medium>Sample Col</Col>))
    test('renders correctly without responsive when smallest breakpoint', () =>
      shouldMatchEmotionSnapshot(<Col xsmall>Sample Col</Col>))
  })
})
