import { NextPageContext } from 'next'
import React from 'react'

type ErrorPageProps = {
  statusCode: number
}

const ErrorPage = ({ statusCode }: ErrorPageProps): JSX.Element => (
  <div>
    {statusCode
      ? `SCWUI: An error ${statusCode} occurred on server`
      : 'SCWUI: An error occurred on client'}
  </div>
)

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode || err?.statusCode || 404

  return { statusCode }
}

export default ErrorPage
