import styled from '@emotion/styled'
import { Stack, Text } from '@ultraviolet/ui'
import CopyBox from '../../components/CopyBoxCommand'

const useCase1 = `import { theme as lightTheme, dark as darkTheme, Button, Text } from '@ultraviolet/ui'
import { ThemeProvider } from '@ultraviolet/themes'
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
  Card,
  SelectInput,
  TextBox,
  Text,
} from "@ultraviolet/ui"
import React from "react"

const StyledFieldContainer = styled.div\`
  margin-bottom: \${({ theme }) => theme.space['2']};
\`

const App = () => (
  <ThemeProvider theme={theme}>
    <Card>
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
    </Card>
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
      <StyledTitle as="h3" id="advanced-use-cases" variant="heading">
        Advanced Use Cases
      </StyledTitle>
      <Text as="p" variant="body">
        If you want to change the theme or even to create a dark theme, Scaleway
        UI allows you to do it easily
      </Text>
      <CopyBox>
        <CopyBox.Command command={useCase1} title="Dark theme" />
        <CopyBox.Command command={useCase2} title="Simple Form" />
      </CopyBox>
    </Stack>
  </section>
)

export default AdvancedUseCases
