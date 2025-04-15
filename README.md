# Tax Calculator

A modern, responsive web application built with Astro that calculates income tax based on tax brackets. This application provides real-time tax calculations, displaying effective tax rates, tax amounts, and net income.

> **Note**: This application was created for learning purposes to demonstrate modern web development practices, including:
> - Building interactive applications with Astro framework
> - TypeScript implementation in a real-world scenario
> - Progressive tax calculation logic
> - Responsive UI/UX design
> - Accessibility best practices
> - Local storage usage
> - Real-time calculations and updates

## Features

- Real-time tax calculations
- Progressive tax bracket visualization
- Responsive design that works on all devices
- Effective tax rate calculation
- Local storage for saving last entered income
- Keyboard navigation support
- Accessible UI components

## Technology Stack

- [Astro](https://astro.build/) - Web framework
- TypeScript - For type-safe JavaScript code
- CSS3 - For styling with modern features
- LocalStorage API - For persisting user data

## Project Structure

```
src/
├── components/           # UI Components
│   ├── TaxBrackets.astro    # Tax brackets table display
│   ├── TaxCalculator.astro  # Main calculator container
│   ├── TaxInput.astro       # Income input field
│   └── TaxResults.astro     # Tax calculation results
├── layouts/
│   └── Layout.astro         # Base layout template
├── pages/
│   └── index.astro          # Main application page
├── scripts/
│   ├── calculator.ts        # Tax calculation logic
│   └── main.ts             # Main application logic
└── styles/
    └── global.css          # Global styles
```

## Components

### TaxCalculator
The main container component that orchestrates all other components and provides the calculator interface.

### TaxInput
A specialized input component for entering annual gross income with the following features:
- Currency symbol (€) prefix
- Input validation
- Number formatting
- Focus states and visual feedback

### TaxResults
Displays the calculation results including:
- Effective tax rate
- Tax amount
- Net income
Each value updates in real-time as the user inputs their income.

### TaxBrackets
A responsive table component showing the tax bracket information:
- Income ranges
- Tax rates per bracket
- Mobile-optimized view

## Tax Calculation Logic

The application uses a progressive tax system with the following brackets:
- 10% for income from €0 to €20,550
- 12% for income from €20,551 to €83,550
- 22% for income from €83,551 to €178,150
- 24% for income from €178,151 to €340,100
- 32% for income from €340,101 to €431,900
- 35% for income from €431,901 to €647,850
- 37% for income above €647,851

## User Experience Features

- Real-time calculations without page reloads
- Debounced input to prevent performance issues
- Keyboard navigation support (Enter to confirm, Escape to clear)
- Persistent storage of last entered income
- Mobile-first responsive design
- Accessible UI with ARIA attributes

## Development

To run this project locally:

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## Accessibility

The application is built with accessibility in mind:
- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast color scheme
- Responsive text sizing
- Screen reader friendly updates

## Browser Support

The application supports all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Performance

- Efficient tax calculations
- Debounced input handling
- Local storage for data persistence
- Minimal dependencies
- Responsive design optimization

## License

This project is licensed under the MIT License.