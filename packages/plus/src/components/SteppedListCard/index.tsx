import styled from '@emotion/styled'
import { Bullet, Button, Stack, Text } from '@ultraviolet/ui'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

type SteppedListCardProps = {
  stepNumber: 1 | 2 | 3 | 4 | 5
  subHeader?: ReactNode
  children: ReactNode
  image?: ReactNode
  done: boolean
  nextButton?: boolean
  previousButton?: boolean
}
type SteppedListCardContentProps = {
  subHeader?: ReactNode
  children: ReactNode
  image?: ReactNode
  nextButton?: ReactNode
  previousButton?: ReactNode
}

type ContextType = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  setContent: React.Dispatch<React.SetStateAction<SteppedListCardContentProps>>
}

type CustomBulletProps = {
  active: boolean
  done: boolean
  stepNumber: number
}

const iContextState = {
  currentStep: 1,
  setCurrentStep: () => {},
  setContent: () => {},
}

const CurrentStep = createContext<ContextType>(iContextState)

const StyledContent = styled(Stack)`
  width: 808px;
  padding: ${({ theme }) => theme.space['3']};
`

const Content = styled(Stack)`
  border: solid ${({ theme }) => theme.colors.neutral.border};
`
const StyledImage = styled.div`
  display: flex;
  justify-content: right;
`

const CustomStack = styled(Stack)`
  cursor: pointer;
`
const ContentStack = styled(Stack)`
  padding: ${({ theme }) => theme.space['3']};
  border-right: solid ${({ theme }) => theme.colors.neutral.border};
`

const SteppedListCardContent = ({
  subHeader,
  children,
  image,
  nextButton,
  previousButton,
}: SteppedListCardContentProps) => (
  <StyledContent>
    <Text as="h3" variant="headingSmallStrong">
      {subHeader}
    </Text>
    {children}
    <Stack gap={2} direction="row">
      {nextButton} {previousButton}
    </Stack>
    <StyledImage>{image}</StyledImage>
  </StyledContent>
)
const CustomBullet = ({ active, done, stepNumber }: CustomBulletProps) => {
  if (active && done) {
    return <Bullet icon="check" prominence="strong" sentiment="primary" />
  }
  if (active && !done) {
    return (
      <Bullet
        text={String(stepNumber)}
        prominence="strong"
        sentiment="primary"
      />
    )
  }
  if (!active && done) {
    return <Bullet icon="check" prominence="default" sentiment="primary" />
  }

  return <Bullet text={String(stepNumber)} />
}

const SteppedListCard = ({
  stepNumber,
  subHeader,
  children,
  image,
  done,
  nextButton,
  previousButton,
}: SteppedListCardProps) => {
  const stepper = useContext(CurrentStep)
  const active = stepper.currentStep === stepNumber

  const setContent = useCallback(() => {
    stepper.setContent({
      subHeader,
      children,
      image,
      previousButton,
      nextButton,
    })
  }, [stepper, subHeader, children, image, previousButton, nextButton])

  useEffect(() => {
    if (active) {
      setContent()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepper.currentStep])

  return (
    <div>
      {active ? (
        <CustomStack
          direction="row"
          width="272px"
          onClick={() => stepper.setCurrentStep(stepNumber)}
          gap={2}
        >
          <CustomBullet active={active} done={done} stepNumber={stepNumber} />
          <Text as="h3" variant={active ? 'bodyStrong' : 'body'}>
            {subHeader}
          </Text>
        </CustomStack>
      ) : (
        <CustomStack
          width="272px"
          direction="row"
          onClick={() => stepper.setCurrentStep(stepNumber)}
          gap={2}
        >
          <CustomBullet active={active} done={done} stepNumber={stepNumber} />

          <Text as="h3" variant={active ? 'bodyStrong' : 'body'}>
            {subHeader}
          </Text>
        </CustomStack>
      )}
    </div>
  )
}

type SteppedListContainerProps = {
  header: string
  children: ReactNode
}

const SteppedListContainer = ({
  header,
  children,
}: SteppedListContainerProps) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [content, setContent] = useState<SteppedListCardContentProps>({
    subHeader: null,
    children: null,
    image: null,
    nextButton: null,
    previousButton: null,
  })
  const [hide, setHide] = useState(false)
  const values = useMemo(
    () => ({ currentStep, setCurrentStep, setContent }),
    [currentStep, setCurrentStep, setContent],
  )
  if (hide) {
    return <Button onClick={() => setHide(!hide)}>Show</Button>
  }

  return (
    <CurrentStep.Provider value={values}>
      <Stack direction="row">
        {typeof header === 'string' ? (
          <Text as="h3" variant="heading">
            {header}
          </Text>
        ) : (
          header
        )}

        <Button
          onClick={() => setHide(!hide)}
          variant="ghost"
          sentiment="neutral"
          size="small"
          tooltip="To show again, go to Actions 
menu above"
        >
          Hide
        </Button>
      </Stack>
      <Content direction="row">
        <ContentStack direction="column" gap={4}>
          {children}
        </ContentStack>
        <SteppedListCardContent
          subHeader={content.subHeader}
          image={content.image}
          nextButton={
            content.nextButton ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next step
              </Button>
            ) : null
          }
          previousButton={
            content.previousButton ? (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outlined"
              >
                Previous step
              </Button>
            ) : null
          }
        >
          {content.children}
        </SteppedListCardContent>
      </Content>
    </CurrentStep.Provider>
  )
}

SteppedListContainer.Card = SteppedListCard
export { SteppedListContainer }
