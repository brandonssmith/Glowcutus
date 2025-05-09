# Inspiration Button

A creative prompt generator that provides art, music, writing, and encouraging prompts with a beautiful, interactive interface.

## Features

- **Multiple Prompt Types**:
  - Art prompts for visual creativity
  - Music prompts for composition
  - Writing prompts based on quotes
  - Encouraging messages and quotes

- **Dynamic Content**:
  - 30 unique art prompts
  - 30 unique music prompts
  - 30 default encouraging prompts
  - 100 quotes from the Quotable API
  - Daily refresh of encouraging quotes

- **Interactive UI**:
  - Animated button interactions
  - Random font selection for each prompt
  - Color-coded prompt types
  - Responsive design
  - Loading states and animations

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Quotable API

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd inspiration-button
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
  ├── App.tsx          # Main application component
  ├── App.css          # Application styles
  ├── index.tsx        # Application entry point
  └── types.d.ts       # TypeScript type definitions
```

## Usage

1. Click the main button to generate a random prompt
2. Use the smaller button to toggle between:
   - "Create" mode: Generates art, music, or writing prompts
   - "Encourage" mode: Generates encouraging quotes and messages

## API Integration

The application uses the [Quotable API](https://api.quotable.io) to fetch:
- Writing prompts
- Encouraging quotes
- Daily refreshed content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Quotable API](https://api.quotable.io) for providing the quote data
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Google Fonts](https://fonts.google.com) for the font variety 