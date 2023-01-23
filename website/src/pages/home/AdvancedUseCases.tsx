import styled from '@emotion/styled'
import { Stack, Text } from '@scaleway/ui'
import CopyBox from '../../components/CopyBoxCommand'

const useCase1 = `import { ThemeProvider } from '@emotion/react'
import { theme as lightTheme, dark as darkTheme, Button, Text } from '@scaleway/ui'
import React, { useCallback, useState } from 'react'

const App = () => {
  const [isLightMode, setIsLightMode] = useState(true)

  const setLightModeCallBack = useCallback(
    isLight => {
      setIsLightMode(isLight)
    },
    [setIsLightMode],
  )

  return (
    <ThemeProvider theme={isLightMode ? lightTheme : darkTheme}>
      <Text as="p" variant="body">
        This could be a very cool introduction text.
      </Text>
      <Switch
        name="darkMode"
        size="small"
        width={54}
        checked={isLightMode}
        onChange={(event) => {
          setLightModeCallBack(event.target.checked)
        }}
        labeled
        onLabel={<Icon size={20} name="sun" />}
        offLabel={<Icon size={20} name="moon" />}
      />
    </ThemeProvider>
  )
}

export default App
`

const useCase2 = `import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import {
  theme,
  Button,
  Checkbox,
  Container,
  SelectInput,
  TextBox,
  Text,
} from "@scaleway/ui"
import React from "react"

const StyledFieldContainer = styled.div\`
  margin-bottom: \${({ theme }) => theme.space['2']};
\`

const App = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <Text as="h1" variant="headingLarge">Welcome to this form example</Text>
      <StyledFieldContainer>
        <TextBox
          name="name"
          label="Your name"
          placeholder="John Doe"
          notice="Same as your official ID"
        />
      </StyledFieldContainer>
      <StyledFieldContainer>
        <SelectInput name="language" placeholder="Your favourite language">
          <SelectInput.Option value="javascript1">Javascript</SelectInput.Option>
          <SelectInput.Option value="javascript2">Javascript</SelectInput.Option>
          <SelectInput.Option value="javascript3">Javascript</SelectInput.Option>
        </SelectInput>
      </StyledFieldContainer>
      <StyledFieldContainer>
        <Checkbox name="terms">I agree with this form</Checkbox>
      </StyledFieldContainer>
      <StyledFieldContainer>
        <Button name="submit" type="submit">
          Submit
        </Button>
      </StyledFieldContainer>
    </Container>
  </ThemeProvider>
)

export default App
`

const StyledTitle = styled(Text)`
  align-self: center;
`

const AdvancedUseCases = () => (
  <section>
    <Stack gap={5}>
      <StyledTitle as="h3" variant="heading" id="advanced-use-cases">
        Advanced Use Cases
      </StyledTitle>
      <Text as="p" variant="body">
        If you want to change the theme or even to create a dark theme, Scaleway
        UI allows you to do it easily
      </Text>
      <CopyBox>
        <CopyBox.Command title="Dark theme" command={useCase1} />
        <CopyBox.Command title="Simple Form" command={useCase2} />
      </CopyBox>
    </Stack>
  </section>
)

export default AdvancedUseCases
