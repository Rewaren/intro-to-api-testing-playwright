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


## Test scenarios for loan-risk-decision API

| Scenario Name                                                 | Type     |
|---------------------------------------------------------------|----------|
| POST - Submit loan application with Low risk level            | Positive |
| POST - Submit loan application with Medium risk level         | Positive |
| POST - Submit loan application with High risk level           | Positive |
| POST - Submit loan application with insufficient income       | Negative |
| POST - Submit loan application with high loan amount          | Negative |
| POST - Submit loan application with very short loan period    | Positive |
| POST - Submit loan application with income and unemployment status | Negative |
| POST - Submit loan application with minimum age requirement   | Positive |
| POST - Submit loan application with invalid loan amount       | Negative |
| POST - Submit loan application with zero income but employed  | Negative |