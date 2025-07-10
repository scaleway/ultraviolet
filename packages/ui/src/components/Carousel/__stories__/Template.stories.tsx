import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react-vite'
import { Carousel } from '..'

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.info.background};
  width: 100%;
  padding: ${({ theme }) => theme.space['3']};
  color: ${({ theme }) => theme.colors.info.text};
  text-align: center;
`

export const Template: StoryFn<typeof Carousel> = props => (
  <Carousel {...props}>
    <Carousel.Item>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam
      </Content>
    </Carousel.Item>
    <Carousel.Item>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Content>
    </Carousel.Item>
    <Carousel.Item>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Content>
    </Carousel.Item>
    <Carousel.Item>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Content>
    </Carousel.Item>
    <Carousel.Item>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Content>
    </Carousel.Item>
    <Carousel.Item>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Content>
    </Carousel.Item>
  </Carousel>
)
