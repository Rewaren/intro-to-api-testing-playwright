# API Test Checklist

## Test Scenarios for Orders API

| Scenario Name | Type |
|---------------|------|
| GET - Get order with valid ID | Positive |
| GET - Get order with incorrect ID| Negative |
| GET - Get order with invalid ID format | Negative |
| GET - Get order without authentication | Negative |
| PUT - Update order with valid data and API key | Positive |
| PUT - Update order with invalid ID | Negative |
| PUT - Update order without API key | Negative | 
| PUT - Update order with invalid API key | Negative |
| PUT - Update order with invalid data | Negative |
| DELETE - Delete order with valid ID and API key | Positive |
| DELETE - Delete order with invalid ID | Negative |
| DELETE - Delete order without API key | Negative |
| DELETE - Delete order with invalid API key | Negative |
| DELETE - Delete already deleted order | Negative |
| GET Login - Login with valid credentials | Positive |