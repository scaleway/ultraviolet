import styled from '@emotion/styled'
import React from 'react'

const StyledGroup = styled.g`
  fill: ${({ theme }): string => theme.colors.primary.text};
`

type LogoProps = {
  width: number
  height: number
}

const Logo = ({ width, height }: LogoProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 409 79"
    xmlns="http://www.w3.org/2000/svg"
  >
    <StyledGroup>
      <path d="M104 67.51a25.64 25.64 0 0 1-12.06-3.11 28.13 28.13 0 0 1-9.74-8.36 2 2 0 0 1 .34-2.84l4.66-4.14a2 2 0 0 1 1.38-.52h.34a2.15 2.15 0 0 1 1.47.95 18.77 18.77 0 0 0 6.29 6.21 15.76 15.76 0 0 0 8.1 2.24c3.1 0 5.43-.61 6.89-1.9a5.88 5.88 0 0 0 2.07-4.91 6.2 6.2 0 0 0-2.24-5.26c-1.81-1.38-4.74-2.67-8.79-3.88-12-2.93-18-8.62-18-17 0-5.17 1.72-9.22 5.17-12.06s7.93-4.14 13.62-4.14a24.33 24.33 0 0 1 20 9.48 2.14 2.14 0 0 1-.26 2.93l-4.53 3.8a1.93 1.93 0 0 1-1.38.52h-.26a2 2 0 0 1-1.46-.86 16.22 16.22 0 0 0-5.34-4.91 14.64 14.64 0 0 0-6.81-1.56A11.43 11.43 0 0 0 96.82 20a5.37 5.37 0 0 0-2.24 4.49 5.62 5.62 0 0 0 2.07 4.65c1.64 1.38 4.57 2.5 8.7 3.53 5.61 1.56 10 3.62 13.19 6.3 3.36 2.93 5.09 7 5.09 12.15a15.08 15.08 0 0 1-2.59 8.53 16.18 16.18 0 0 1-7 5.78A22.44 22.44 0 0 1 104 67.51zm44.62.17a19 19 0 0 1-10.34-2.76 18.65 18.65 0 0 1-7.07-7.59 22.57 22.57 0 0 1-2.5-10.86 22 22 0 0 1 2.5-10.77 18.73 18.73 0 0 1 7.07-7.58 20.3 20.3 0 0 1 10.25-2.76 16.86 16.86 0 0 1 8.62 2.15 23.3 23.3 0 0 1 6.55 5.78 2.14 2.14 0 0 1-.34 2.93l-3.79 3a2.33 2.33 0 0 1-1.3.44h-.34a2 2 0 0 1-1.38-.87 9.3 9.3 0 0 0-7.93-4.48 10.54 10.54 0 0 0-5.34 1.47 9.76 9.76 0 0 0-3.71 4.22 16.07 16.07 0 0 0 0 12.93 10 10 0 0 0 3.71 4.31 8.93 8.93 0 0 0 5.34 1.46 10.07 10.07 0 0 0 5-1 11.48 11.48 0 0 0 3.62-3.1 2.13 2.13 0 0 1 2.84-.43l4.06 2.84a2.1 2.1 0 0 1 .51 2.93.08.08 0 0 1-.08.09 20.46 20.46 0 0 1-6.9 5.51 19.91 19.91 0 0 1-9.05 2.14zm38.7 0A19 19 0 0 1 170 57.33a24.4 24.4 0 0 1 0-21.63 18.8 18.8 0 0 1 17.15-10.34 18.18 18.18 0 0 1 8.19 1.89c.85.44 1.66.96 2.41 1.56v-.18a2.1 2.1 0 0 1 2.07-2.07H205a2.1 2.1 0 0 1 2.07 2.07v35.69a2.09 2.09 0 0 1-2.07 2.06h-5.17a2.09 2.09 0 0 1-2.07-2.06v-.09c-.78.52-1.55 1-2.33 1.47a16.66 16.66 0 0 1-8.11 1.98zm-.17-33.36a10 10 0 0 0-5.26 1.47 11.07 11.07 0 0 0-3.71 4.22 15.11 15.11 0 0 0-1.37 6.46 14.45 14.45 0 0 0 1.37 6.55 9.93 9.93 0 0 0 3.71 4.31 8.63 8.63 0 0 0 5.26 1.47 10.92 10.92 0 0 0 5.43-1.47 9.85 9.85 0 0 0 3.7-4.31 16 16 0 0 0 0-12.92 10.3 10.3 0 0 0-3.7-4.23 8.92 8.92 0 0 0-5.43-1.55zm28.79-25.23h5.17a2.1 2.1 0 0 1 2.07 2.07v53.18a2.1 2.1 0 0 1-2.07 2.07h-5.17a2.1 2.1 0 0 1-2.07-2.07V11.16a2 2 0 0 1 2.07-2.07zm90.58 57.38a2 2 0 0 1-2-1.46l-6.81-21.29-7.32 21.37a2 2 0 0 1-2 1.38h-5.17a2 2 0 0 1-2-1.46l-11.81-35.69a2.11 2.11 0 0 1 1-2.5 2.66 2.66 0 0 1 1.12-.26H277a2 2 0 0 1 2 1.47l7.16 22.24L293.42 28a2.13 2.13 0 0 1 2-1.47h5.09a2 2 0 0 1 2 1.47l7 22 7.07-22a2.13 2.13 0 0 1 2-1.47h4.92a3.7 3.7 0 0 1 .86.18 2.09 2.09 0 0 1 1.21 2.58L313.85 65a2.12 2.12 0 0 1-2 1.46l-5.33.01zm40.08 1.21a19.06 19.06 0 0 1-17.32-10.35 24.47 24.47 0 0 1 0-21.63 18.81 18.81 0 0 1 17.24-10.34 17.63 17.63 0 0 1 8.1 2c.85.43 1.66.95 2.41 1.55v-.17a2.18 2.18 0 0 1 2.07-2.16h5.26a2.1 2.1 0 0 1 2.07 2.07v35.69a2.09 2.09 0 0 1-2.07 2.06h-5.17a2.09 2.09 0 0 1-2.07-2.06v-.09a23 23 0 0 1-2.33 1.47 17.25 17.25 0 0 1-8.19 1.96zm-.08-33.36a10 10 0 0 0-5.26 1.47 11 11 0 0 0-3.71 4.22 13.9 13.9 0 0 0-1.38 6.46 14.46 14.46 0 0 0 1.38 6.55 9.93 9.93 0 0 0 3.71 4.31 8.63 8.63 0 0 0 5.26 1.47 10.35 10.35 0 0 0 5.34-1.47 9.93 9.93 0 0 0 3.71-4.31 16 16 0 0 0 0-12.92 9.79 9.79 0 0 0-3.71-4.23 8.66 8.66 0 0 0-5.34-1.55zm-84.9 19.57a2.3 2.3 0 0 0-3.11.43 12.21 12.21 0 0 1-3.36 3 13.39 13.39 0 0 1-6.55 1.47 9.11 9.11 0 0 1-7.32-3.1 13.17 13.17 0 0 1-2.85-5.95h27a2.07 2.07 0 0 0 2.07-1.9 20.23 20.23 0 0 0 .08-2.41 20.6 20.6 0 0 0-2.49-10.08 18.81 18.81 0 0 0-16.73-9.92 19.8 19.8 0 0 0-10.17 2.76 18.5 18.5 0 0 0-7 7.59 23.55 23.55 0 0 0-2.5 10.77 22.72 22.72 0 0 0 2.5 10.86 19.34 19.34 0 0 0 7.07 7.59 20.62 20.62 0 0 0 10.34 2.75 22.18 22.18 0 0 0 10.78-2.5 20.93 20.93 0 0 0 6.29-5.43 2.33 2.33 0 0 0-.43-3.27.09.09 0 0 1-.09-.09l-3.53-2.57zm-19.74-17.07a9 9 0 0 1 6.64-2.58c2.84 0 5.08.68 6.63 2.24a9.79 9.79 0 0 1 2.59 4.74H239a11.4 11.4 0 0 1 2.88-4.4zm166.69-9.31a2.26 2.26 0 0 0-1.72-.86h-4.91a2.14 2.14 0 0 0-2 1.38l-10.08 26-9.57-26.12a2.18 2.18 0 0 0-2-1.29h-5.43a2 2 0 0 0-1.72.95 2.05 2.05 0 0 0-.18 2L385 66.64a5.51 5.51 0 0 1-2.07 3.45c-1.29.86-3.79.95-5.17 1a2.26 2.26 0 0 0-2.15 2.24v3.53a2.22 2.22 0 0 0 2.24 2.24c2.15 0 5.69.17 8.45-1.21 5.68-3 6.46-6.72 8.1-10.94l14.39-37.58a2.43 2.43 0 0 0-.22-1.86zM29.24 58.65a4.63 4.63 0 0 1-.06-9.26h5.69a3 3 0 0 0 3-3V34.88a4.6 4.6 0 1 1 9.2 0V53a6 6 0 0 1-5.25 5.63H29.24v.02z" />
      <path d="M29.24 58.4H41.8a5.71 5.71 0 0 0 5-5.39V34.88a4.35 4.35 0 0 0-8.7 0v11.51a3.27 3.27 0 0 1-3.25 3.25h-5.67A4.37 4.37 0 0 0 24.83 54v.06a4.38 4.38 0 0 0 4.41 4.34zm-7.53-13.29a4.6 4.6 0 0 1-4.6-4.6V22.38a6 6 0 0 1 5.24-5.64h12.59a4.67 4.67 0 0 1 4.66 4.59A4.62 4.62 0 0 1 35 26h-5.7a3 3 0 0 0-3 3v11.51a4.6 4.6 0 0 1-4.59 4.6z" />
      <path d="M34.94 17H22.38a5.7 5.7 0 0 0-5 5.39v18.13a4.35 4.35 0 1 0 8.69 0V29a3.23 3.23 0 0 1 3.25-3.24H35a4.37 4.37 0 0 0 4.35-4.35v-.06A4.43 4.43 0 0 0 34.94 17zm1.98-8.18A18.11 18.11 0 0 1 55.05 27v34.87a5.67 5.67 0 0 1-4.8 4.63H27.07A18.12 18.12 0 0 1 8.94 48.37V14.46a5.66 5.66 0 0 1 5.58-5.68M37-.47H14.17A14.5 14.5 0 0 0-.28 14v34.54A27.24 27.24 0 0 0 27 75.79h24.14A14.37 14.37 0 0 0 64.27 63V26.73A27.22 27.22 0 0 0 37-.47z" />
    </StyledGroup>
  </svg>
)

export default Logo
