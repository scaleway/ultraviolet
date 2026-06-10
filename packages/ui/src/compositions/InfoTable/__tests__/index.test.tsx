import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { InfoTable } from '..'
import { Button } from '../../../components/Button'
import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'

describe('infoTable', () => {
  it('should work with default props', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="1fr">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">
            cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with multiLine', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="1fr">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell multiline title="title">
            cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with width', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable width="30%">
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="1fr">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">
            cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should work with CellWithCopybutton', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="1fr">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">
            cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell cell
            cell cell cell cell cell cell cell cell cell
          </InfoTable.Cell>
          <InfoTable.CellWithCopyButton
            buttonSize="small"
            copiedText="copied"
            copyContent="copy"
            copyText="copy"
            onCopy={vi.fn}
            title="title"
          >
            a content
          </InfoTable.CellWithCopyButton>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly small', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable size="small">
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with a header', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable header="Header">
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )

    const header = screen.getByRole('heading')

    expect(header).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render correctly with complex header', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable
        header={
          <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
            <Text as="h2" variant="heading">
              header
            </Text>
            <Button sentiment="neutral" size="medium">
              Click
            </Button>
          </Stack>
        }
      >
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )

    const headerText = screen.getByRole('heading')
    const headerButton = screen.getByRole('button', { name: 'Click' })

    expect(headerText).toBeInTheDocument()
    expect(headerButton).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('should not add empty h2 with header set to true', () => {
    const { asFragment } = renderWithTheme(
      <InfoTable header>
        <InfoTable.Row templateColumns="repeat(3, 1fr)">
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
        <InfoTable.Row templateColumns="2fr 1fr">
          <InfoTable.Cell title="title">cell with more text</InfoTable.Cell>
          <InfoTable.Cell title="title">cell</InfoTable.Cell>
        </InfoTable.Row>
      </InfoTable>,
    )

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })
})
