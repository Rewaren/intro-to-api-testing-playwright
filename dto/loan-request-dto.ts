export class LoanRequestDto {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static createLowRiskRequest(): LoanRequestDto {
    return new LoanRequestDto(2000, 0, 30, true, 500, 12)
  }

  static createMediumRiskRequest(): LoanRequestDto {
    return new LoanRequestDto(2000, 0, 30, true, 500, 9)
  }

  static createHighRiskRequest(): LoanRequestDto {
    return new LoanRequestDto(2000, 0, 20, true, 500, 3)
  }

  static createInsufficientIncomeRequest(): LoanRequestDto {
    return new LoanRequestDto(0, 0, 20, true, 5000, 7)
  }

  static createHighLoanAmountRequest(): LoanRequestDto {
    return new LoanRequestDto(1500, 1000, 20, true, 500000000, 7)
  }

  static createVeryShortLoanPeriodRequest(): LoanRequestDto {
    return new LoanRequestDto(1500, 1000, 20, true, 5000, 1)
  }

  static createInvalidEmploymentStatusRequest(): LoanRequestDto {
    return new LoanRequestDto(200, 0, 20, false, 500, 12)
  }

  static createMinimumAgeRequirementRequest(): LoanRequestDto {
    return new LoanRequestDto(1500, 1000, 16, true, 5000, 7)
  }

  static createInvalidLoanAmountRequest(): LoanRequestDto {
    return new LoanRequestDto(1500, 1000, 20, true, -5000, 7)
  }

  static createZeroIncomeButEmployedRequest(): LoanRequestDto {
    return new LoanRequestDto(0, 0, 20, true, 5000, 7)
  }
}
