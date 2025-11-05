import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanRequestDto } from '../../dto/loan-request-dto'

test('POST - Submit loan application with Low risk level, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createLowRiskRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
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

test('POST - Submit loan application with Medium risk level, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createMediumRiskRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Medium Risk')
  expect.soft(responseBody.riskPeriods).toEqual([6, 9, 12])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
})

test('POST - Submit loan application with High risk level, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createHighRiskRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([3, 6])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
})

test('POST - Submit loan application with insufficient income, should return 400', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createInsufficientIncomeRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  const responseText = await response.text()

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect.soft(responseText).toBe('')

  console.log('response status:', response.status())
  console.log('response body length:', responseText.length)
  console.log('response body:', responseText)
})

test('POST - Submit loan application with high loan amount, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createHighLoanAmountRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Very High Risk')
  expect.soft(responseBody.riskPeriods).toEqual([])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('negative')

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
})

test('POST - Submit loan application with very short loan period, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createVeryShortLoanPeriodRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBe('Unknown Risk')
  expect.soft(responseBody.riskPeriods).toEqual([])
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
})

test('POST - Submit loan application with income and unemployment status, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createInvalidEmploymentStatusRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBeDefined()
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('negative')

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
})

test('POST - Submit loan application with minimum age requirement, should return 200', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createMinimumAgeRequirementRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  expect.soft(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.json()
  expect.soft(responseBody.riskScore).toBeDefined()
  expect.soft(responseBody.riskLevel).toBeDefined()
  expect.soft(responseBody.riskPeriods).toBeDefined()
  expect.soft(responseBody.applicationId).toBeDefined()
  expect.soft(responseBody.riskDecision).toBe('positive')

  console.log('response status:', response.status())
  console.log('response body:', responseBody)
})

test('POST - Submit loan application with invalid loan amount, should return 400', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createInvalidLoanAmountRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  const responseText = await response.text()

  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect.soft(responseText).toBe('')

  console.log('response status:', response.status())
  console.log('response body length:', responseText.length)
  console.log('response body:', responseText)
})

test('POST - Submit loan application with zero income but employed, should return 400', async ({
  request,
}) => {
  const requestBody = LoanRequestDto.createZeroIncomeButEmployedRequest()
  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  const responseText = await response.text()
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
  expect.soft(responseText).toBe('')
  console.log('response status:', response.status())
  console.log('response body length:', responseText.length)
  console.log('response body:', responseText)
})
