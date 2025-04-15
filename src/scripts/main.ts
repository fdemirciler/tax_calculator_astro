import {
  TAX_BRACKETS,
  formatCurrency,
  formatNumber,
  calculateTax,
  validateInput,
  saveToLocalStorage,
  loadFromLocalStorage
} from './calculator';

// DOM Elements
const initializeDOM = () => {
  const DOM = {
    incomeInput: document.getElementById('income') as HTMLInputElement,
    taxRateElement: document.getElementById('taxRate') as HTMLElement,
    taxAmountElement: document.getElementById('taxAmount') as HTMLElement,
    netIncomeElement: document.getElementById('netIncome') as HTMLElement,
    taxBracketsBody: document.getElementById('taxBracketsBody') as HTMLElement
  };

  if (!DOM.incomeInput || !DOM.taxRateElement || !DOM.taxAmountElement ||
    !DOM.netIncomeElement || !DOM.taxBracketsBody) {
    throw new Error('Required DOM elements not found');
  }

  return DOM;
};

// UI Updates
const updateResultsUI = (DOM: ReturnType<typeof initializeDOM>, income: number): void => {
  const tax = calculateTax(income);
  const effectiveTaxRate = income > 0 ? ((tax / income) * 100).toFixed(2) : '0';
  const netIncome = income - tax;

  DOM.taxRateElement.textContent = `${effectiveTaxRate}%`;
  DOM.taxAmountElement.textContent = formatCurrency(tax);
  DOM.netIncomeElement.textContent = formatCurrency(netIncome);
};

const populateTaxBrackets = (DOM: ReturnType<typeof initializeDOM>): void => {
  DOM.taxBracketsBody.innerHTML = TAX_BRACKETS.map(bracket =>
    `          <tr>
            <td>€${formatNumber(bracket.low)}</td>
            <td>${bracket.high === Infinity ? 'Above' : '€' + formatNumber(bracket.high)}</td>
            <td>${(bracket.rate * 100).toFixed(0)}%</td>
          </tr>`
  ).join('\n');
};

// Event Handlers
const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

const setupEventListeners = (DOM: ReturnType<typeof initializeDOM>) => {
  const handleIncomeInput = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const rawValue = target.value;
    const numericValue = validateInput(rawValue);

    const formattedValue = numericValue > 0 ? formatNumber(numericValue) : '';
    target.value = formattedValue;

    updateResultsUI(DOM, numericValue);
    saveToLocalStorage(numericValue);
  };

  const handleKeyboardNavigation = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      DOM.incomeInput.value = '';
      updateResultsUI(DOM, 0);
      saveToLocalStorage(0);
    }
  };

  DOM.incomeInput.addEventListener('input', debounce(handleIncomeInput, 300));
  DOM.incomeInput.addEventListener('keydown', handleKeyboardNavigation);
};

// Initialization
const init = () => {
  try {
    const DOM = initializeDOM();
    populateTaxBrackets(DOM);

    const savedIncome = loadFromLocalStorage();
    if (savedIncome > 0) {
      DOM.incomeInput.value = formatNumber(savedIncome);
      updateResultsUI(DOM, savedIncome);
    }

    setupEventListeners(DOM);
  } catch (error) {
    console.error('Failed to initialize calculator:', error);
  }
};

// Ensure DOM is loaded before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}