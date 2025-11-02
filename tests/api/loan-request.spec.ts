import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanRequestDto } from '../dto/loan-request-dto'

test('POST - Submit loan application with Low risk level, should return 200', async ({ request }) => {
  const requestBody = LoanRequestDto.createLowRiskRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Low Risk')
  expect.soft(responseBody.riskPeriods).toEqual([12, 18, 24, 30, 36])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')

  console.log('response status:', response.status())
  console.log('response body:', await responseBody)
})
