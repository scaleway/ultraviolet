import styled from '@emotion/styled'
import { Button, Expandable, Snippet, Stack, Text } from '@ultraviolet/ui'
import { useReducer } from 'react'
import * as assets from '../index'

type AssetsModule = Record<string, Record<string, Record<string, string>>>

const StyledSnippet = styled(Snippet)`
  padding: ${({ theme }) => theme.space['2']};
`

const StyledButton = styled(Button)`
  width: fit-content;
  height: fit-content;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space['0.5']}
    ${({ theme }) => theme.space['1']};
  text-align: left;
`

const StyledImage = styled.img`
  border-radius: ${({ theme }) => theme.radii.large} 0 0
    ${({ theme }) => theme.radii.large};
  background: ${({ theme }) =>
    theme.theme === 'light' ? theme.colors.neutral.backgroundStronger : null};
`

const MargedStack = styled(Stack)`
  margin-left: ${({ theme }) => theme.space['4']};
`

const Card = styled(Stack)`
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  border-radius: ${({ theme }) => theme.radii.large};
`

type SubListElementProps = {
  productName: string
  isExpanded: boolean
  setIsExpanded: () => void
  category: string
}

const SubListElement = ({
  productName,
  isExpanded,
  setIsExpanded,
  category,
}: SubListElementProps) => (
  <MargedStack gap={1}>
    <StyledButton
      sentiment="neutral"
      onClick={setIsExpanded}
      icon={isExpanded ? 'arrow-up' : 'arrow-down'}
    >
      {productName}
    </StyledButton>
    <Expandable opened={isExpanded}>
      <Stack gap={1}>
        {Object.keys(
          (assets.default as AssetsModule)[category][productName],
        ).map(productImg => (
          <Card direction="row" gap={2} flex={1} alignItems="center">
            <StyledImage
              width={200}
              src={
                (assets.default as AssetsModule)[category][productName][
                  productImg
                ]
              }
              alt={productName}
            />
            <Stack direction="column">
              <Text as="h3" variant="bodyStrong">
                {productImg}.webp
              </Text>
              <StyledSnippet>{`import { ${productImg} } from @ultraviolet/illustrations/${productName}`}</StyledSnippet>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Expandable>
  </MargedStack>
)

export const List = () => {
  const [expandedStates, setExpandedStates] = useReducer(
    (oldState: Record<string, boolean>, newState: Record<string, boolean>) => ({
      ...oldState,
      ...newState,
    }),
    {},
  )
  const [isAllExpanded, setIsAllExpanded] = useReducer(state => !state, false)

  console.log(expandedStates)

  const toggleAllExpanded = () => {
    const newExpandedCategoryStates = Object.keys(assets.default).reduce(
      (acc, category) => ({
        ...acc,
        [category]: !isAllExpanded,
      }),
      {},
    )
    setExpandedStates(newExpandedCategoryStates)

    const newExpandedProductStates = Object.keys(assets.default).reduce(
      (acc, category) => ({
        ...acc,
        ...Object.keys((assets.default as AssetsModule)[category]).reduce(
          (localAcc, productName) => ({
            ...localAcc,
            [productName]: !isAllExpanded,
          }),
          {},
        ),
      }),
      {},
    )
    setExpandedStates(newExpandedProductStates)
    setIsAllExpanded()
  }

  console.log(assets.default.products.cli)

  return (
    <Stack gap={3}>
      <Button
        sentiment="primary"
        onClick={toggleAllExpanded}
        icon={isAllExpanded ? 'minus' : 'plus'}
      >
        {isAllExpanded ? 'Collapse' : 'Expand'} all
      </Button>
      <Stack gap={1}>
        {Object.keys(assets.default).map(category => (
          <>
            <StyledButton
              sentiment="neutral"
              onClick={() => {
                const newExpandedStates = { ...expandedStates }
                newExpandedStates[category] = !expandedStates[category]
                setExpandedStates(newExpandedStates)
              }}
              icon={expandedStates[category] ? 'arrow-up' : 'arrow-down'}
            >
              {category}
            </StyledButton>
            <Expandable opened={expandedStates[category]}>
              <Stack gap={1}>
                {Object.keys((assets.default as AssetsModule)[category]).map(
                  productName => (
                    <SubListElement
                      productName={productName}
                      category={category}
                      isExpanded={expandedStates[productName]}
                      setIsExpanded={() => {
                        // Toggle the expanded state for a specific element
                        const newExpandedStates = { ...expandedStates }
                        newExpandedStates[productName] =
                          !expandedStates[productName]
                        setExpandedStates(newExpandedStates)
                      }}
                    />
                  ),
                )}
              </Stack>
            </Expandable>
          </>
        ))}
      </Stack>
    </Stack>
  )
}
