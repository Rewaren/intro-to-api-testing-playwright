import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from '../../dto/login-dto'


test('should return token with correct username and password', async ({ request }) => {
  // prepare request body
  const requestBody = new LoginDto('reginawk', 'whe7s5qbYbfT2n')

  // Send a POST request to the server
  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })
  // Log the response status and body
  console.log('response body and token:', await response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})