// Tax bracket constants
export const TAX_BRACKETS = [
  { rate: 0.10, low: 0, high: 20550 },
  { rate: 0.12, low: 20551, high: 83550 },
  { rate: 0.22, low: 83551, high: 178150 },
  { rate: 0.24, low: 178151, high: 340100 },
  { rate: 0.32, low: 340101, high: 431900 },
  { rate: 0.35, low: 431901, high: 647850 },
  { rate: 0.37, low: 647851, high: Infinity }
];

// Formatting utilities
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

// Tax calculation
export const calculateTax = (income: number): number => {
  let tax = 0;
  let remainingIncome = income;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const incomeInBracket = Math.min(remainingIncome, bracket.high - bracket.low);

    if (income > bracket.low) {
      const taxableAmountInBracket = Math.min(income, bracket.high) - bracket.low;
      if (taxableAmountInBracket > 0) {
        tax += bracket.rate * taxableAmountInBracket;
      }
    }
    if (income <= bracket.high) {
      break;
    }
  }
  return tax;
};

// Input validation
export const validateInput = (value: string): number => {
  let numericString = value.replace(/[^\d.]/g, '');
  const decimalParts = numericString.split('.');
  if (decimalParts.length > 1) {
    numericString = decimalParts[0] + '.' + decimalParts.slice(1).join('');
  }

  const numericValue = parseFloat(numericString);
  if (isNaN(numericValue) || numericValue < 0) return 0;
  if (numericValue > 1000000000) return 1000000000;
  return numericValue;
};

// Local storage
export const saveToLocalStorage = (income: number): void => {
  try {
    localStorage.setItem('lastIncome', income.toString());
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): number => {
  try {
    const lastIncome = localStorage.getItem('lastIncome');
    if (lastIncome) {
      const numericValue = parseFloat(lastIncome);
      if (!isNaN(numericValue) && numericValue >= 0) {
        return numericValue;
      }
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return 0;
};