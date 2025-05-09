import React, { useState, useEffect } from 'react';
import './App.css';

interface Prompt {
  text: string;
  type: 'writing' | 'art' | 'music' | 'encouragement';
  author?: string;
  font?: string;
}

const fonts = [
  'font-sans', // System default
  'font-serif', // Times New Roman
  'font-mono', // Monospace
  'font-["Playfair_Display"]', // Elegant serif
  'font-["Dancing_Script"]', // Handwriting
  'font-["Poppins"]', // Modern sans-serif
  'font-["Montserrat"]', // Clean sans-serif
  'font-["Roboto"]', // Google's default
  'font-["Lora"]', // Serif with personality
  'font-["Raleway"]', // Modern geometric
  'font-["Merriweather"]', // Readable serif
  'font-["Open_Sans"]', // Friendly sans-serif
];

const artPrompts: Prompt[] = [
  { text: "Sketch a creature that glows in the dark", type: 'art' },
  { text: "Draw a landscape where the sky and ground have swapped colors", type: 'art' },
  { text: "Design a character who can paint with their mind", type: 'art' },
  { text: "Create an abstract piece using only three colors", type: 'art' },
  { text: "Illustrate a scene from your favorite book", type: 'art' },
  { text: "Draw a self-portrait in a style you've never tried before", type: 'art' },
  { text: "Design a logo for a space exploration company", type: 'art' },
  { text: "Create a pattern inspired by nature", type: 'art' },
  { text: "Sketch a futuristic cityscape", type: 'art' },
  { text: "Draw a character that represents your current mood", type: 'art' },
  { text: "Create a mandala using geometric shapes", type: 'art' },
  { text: "Design a book cover for your favorite story", type: 'art' },
  { text: "Draw a scene from your dreams", type: 'art' },
  { text: "Create a character that combines two animals", type: 'art' },
  { text: "Illustrate a moment of pure joy", type: 'art' },
  { text: "Design a poster for an imaginary movie", type: 'art' },
  { text: "Create a piece using only circles", type: 'art' },
  { text: "Draw a portrait using only straight lines", type: 'art' },
  { text: "Design a new type of vehicle", type: 'art' },
  { text: "Create a pattern that tells a story", type: 'art' },
  { text: "Illustrate your favorite childhood memory", type: 'art' },
  { text: "Design a character that represents a season", type: 'art' },
  { text: "Create a piece inspired by your favorite song", type: 'art' },
  { text: "Draw a scene from an alternate universe", type: 'art' },
  { text: "Design a new type of plant", type: 'art' },
  { text: "Create a piece using only primary colors", type: 'art' },
  { text: "Illustrate a moment of transformation", type: 'art' },
  { text: "Design a character that represents an emotion", type: 'art' },
  { text: "Create a piece inspired by a historical event", type: 'art' },
  { text: "Draw a scene from your favorite myth", type: 'art' },
];

const musicPrompts: Prompt[] = [
  { text: "Compose a melody inspired by the sound of rain on a tin roof", type: 'music' },
  { text: "Create a song that tells the story of a lost constellation", type: 'music' },
  { text: "Compose a piece that combines classical and electronic elements", type: 'music' },
  { text: "Write a song about a journey you've never taken", type: 'music' },
  { text: "Create a melody using only five notes", type: 'music' },
  { text: "Compose a piece inspired by your favorite season", type: 'music' },
  { text: "Write a song from the perspective of an inanimate object", type: 'music' },
  { text: "Create a rhythm using everyday household sounds", type: 'music' },
  { text: "Compose a piece that tells a story without words", type: 'music' },
  { text: "Write a song that captures the feeling of a first day", type: 'music' },
  { text: "Create a melody inspired by ocean waves", type: 'music' },
  { text: "Write a song about a secret place", type: 'music' },
  { text: "Compose a piece using only percussion", type: 'music' },
  { text: "Create a song that tells the story of a dream", type: 'music' },
  { text: "Write a melody inspired by a city at night", type: 'music' },
  { text: "Compose a piece that combines two different cultures", type: 'music' },
  { text: "Create a song about a moment of change", type: 'music' },
  { text: "Write a melody inspired by a natural phenomenon", type: 'music' },
  { text: "Compose a piece that tells a story in reverse", type: 'music' },
  { text: "Create a song about a forgotten memory", type: 'music' },
  { text: "Write a melody inspired by a historical event", type: 'music' },
  { text: "Compose a piece that combines three different genres", type: 'music' },
  { text: "Create a song about a place you've never been", type: 'music' },
  { text: "Write a melody inspired by a childhood memory", type: 'music' },
  { text: "Compose a piece that tells a story without a beginning", type: 'music' },
  { text: "Create a song about a moment of realization", type: 'music' },
  { text: "Write a melody inspired by a favorite book", type: 'music' },
  { text: "Compose a piece that combines nature and technology", type: 'music' },
  { text: "Create a song about a chance encounter", type: 'music' },
  { text: "Write a melody inspired by a work of art", type: 'music' },
];

// Keep some default encouraging prompts as fallback
const defaultEncouragingPrompts: Prompt[] = [
  { text: "Your creativity knows no bounds. Every idea you have is a step toward something amazing.", type: 'encouragement' },
  { text: "The best art comes from the heart. Trust your instincts and let your imagination flow.", type: 'encouragement' },
  { text: "Every masterpiece starts with a single stroke. You're capable of creating something beautiful.", type: 'encouragement' },
  { text: "Your unique perspective is your superpower. Share it with the world.", type: 'encouragement' },
  { text: "Creativity is a journey, not a destination. Enjoy every step of the process.", type: 'encouragement' },
  { text: "The world needs your voice, your vision, your art. Keep creating.", type: 'encouragement' },
  { text: "Every challenge is an opportunity to grow. You're stronger than you know.", type: 'encouragement' },
  { text: "Your potential is limitless. Believe in yourself and your abilities.", type: 'encouragement' },
  { text: "The only limit to your creativity is your imagination. Dream big.", type: 'encouragement' },
  { text: "Your art has the power to inspire others. Keep sharing your gifts.", type: 'encouragement' },
  { text: "Every creation is a reflection of your unique journey. Embrace it.", type: 'encouragement' },
  { text: "The creative process is as beautiful as the final result. Trust the journey.", type: 'encouragement' },
  { text: "Your ideas matter. Your voice matters. Your art matters.", type: 'encouragement' },
  { text: "Creativity is your birthright. Use it to make the world more beautiful.", type: 'encouragement' },
  { text: "The best is yet to come. Keep pushing your boundaries.", type: 'encouragement' },
  { text: "Your creative spirit is a gift to the world. Share it generously.", type: 'encouragement' },
  { text: "Every stroke of your brush, every note you play, every word you write matters.", type: 'encouragement' },
  { text: "The world is waiting for your unique perspective. Don't hold back.", type: 'encouragement' },
  { text: "Your creativity is like a muscle - the more you use it, the stronger it gets.", type: 'encouragement' },
  { text: "Every creative journey begins with a single step. You've already started.", type: 'encouragement' },
  { text: "Your imagination is your greatest tool. Use it to create wonders.", type: 'encouragement' },
  { text: "The creative process is a dance between chaos and order. Trust the rhythm.", type: 'encouragement' },
  { text: "Your art has the power to change lives. Never underestimate its impact.", type: 'encouragement' },
  { text: "Creativity is not a destination but a way of life. Embrace it fully.", type: 'encouragement' },
  { text: "Your unique voice is needed in this world. Let it be heard.", type: 'encouragement' },
  { text: "Every creative block is an opportunity to grow. Push through it.", type: 'encouragement' },
  { text: "Your artistic journey is uniquely yours. Own it with pride.", type: 'encouragement' },
  { text: "The creative spirit within you is infinite. Trust its guidance.", type: 'encouragement' },
  { text: "Your art is a reflection of your soul. Let it shine brightly.", type: 'encouragement' },
  { text: "Creativity is your superpower. Use it to make magic.", type: 'encouragement' },
];

function App() {
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isEncouraging, setIsEncouraging] = useState(false);
  const [encouragingQuotes, setEncouragingQuotes] = useState<Prompt[]>([]);

  // Check if we need to fetch new quotes
  const shouldFetchNewQuotes = () => {
    const lastFetchDate = localStorage.getItem('lastQuoteFetch');
    if (!lastFetchDate) return true;
    
    const lastFetch = new Date(lastFetchDate);
    const today = new Date();
    return lastFetch.getDate() !== today.getDate() || 
           lastFetch.getMonth() !== today.getMonth() || 
           lastFetch.getFullYear() !== today.getFullYear();
  };

  // Fetch encouraging quotes when component mounts and daily
  useEffect(() => {
    const fetchQuotesIfNeeded = async () => {
      if (shouldFetchNewQuotes()) {
        await fetchEncouragingQuotes();
        localStorage.setItem('lastQuoteFetch', new Date().toISOString());
      } else {
        // Load existing quotes from localStorage
        const savedQuotes = localStorage.getItem('savedQuotes');
        if (savedQuotes) {
          setEncouragingQuotes(JSON.parse(savedQuotes));
        } else {
          await fetchEncouragingQuotes();
        }
      }
    };

    fetchQuotesIfNeeded();
  }, []);

  const fetchEncouragingQuotes = async () => {
    try {
      // Fetch 5 new quotes from each category
      const quotes = await Promise.all([
        fetch('https://api.quotable.io/quotes/random?tags=inspirational&limit=5'),
        fetch('https://api.quotable.io/quotes/random?tags=motivational&limit=5'),
        fetch('https://api.quotable.io/quotes/random?tags=success&limit=5'),
        fetch('https://api.quotable.io/quotes/random?tags=leadership&limit=5'),
        fetch('https://api.quotable.io/quotes/random?tags=wisdom&limit=5')
      ]);

      const allQuotes = await Promise.all(quotes.map(res => res.json()));
      const formattedQuotes = allQuotes.flat().map(quote => ({
        text: quote.content,
        type: 'encouragement' as const,
        author: quote.author
      }));

      // Combine with existing quotes from localStorage if any
      const existingQuotes = localStorage.getItem('savedQuotes');
      const combinedQuotes = existingQuotes 
        ? [...formattedQuotes, ...JSON.parse(existingQuotes)]
        : [...formattedQuotes, ...defaultEncouragingPrompts];

      // Save to localStorage
      localStorage.setItem('savedQuotes', JSON.stringify(combinedQuotes));
      setEncouragingQuotes(combinedQuotes);
    } catch (error) {
      console.error('Error fetching encouraging quotes:', error);
      const existingQuotes = localStorage.getItem('savedQuotes');
      if (existingQuotes) {
        setEncouragingQuotes(JSON.parse(existingQuotes));
      } else {
        setEncouragingQuotes(defaultEncouragingPrompts);
      }
    }
  };

  const fetchWritingPrompt = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      return {
        text: `Write a story inspired by this quote: "${data.content}"`,
        type: 'writing' as const,
        author: data.author
      };
    } catch (error) {
      console.error('Error fetching quote:', error);
      return {
        text: "Write a story about a library that contains books from the future",
        type: 'writing' as const
      };
    }
  };

  const handleSmallButtonClick = () => {
    setIsEncouraging(!isEncouraging);
    // Clear the current prompt when switching modes
    setCurrentPrompt(null);
  };

  const handleClick = async () => {
    setIsClicking(true);
    await getRandomPrompt();
    setTimeout(() => setIsClicking(false), 300);
  };

  const getRandomFont = () => {
    return fonts[Math.floor(Math.random() * fonts.length)];
  };

  const getRandomPrompt = async () => {
    setIsAnimating(true);
    setIsLoading(true);
    
    try {
      let newPrompt: Prompt;

      if (isEncouraging) {
        if (encouragingQuotes.length > 0) {
          // Get a random quote that's different from the current one
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * encouragingQuotes.length);
          } while (
            currentPrompt && 
            encouragingQuotes[randomIndex].text === currentPrompt.text
          );
          
          newPrompt = {
            ...encouragingQuotes[randomIndex],
            font: getRandomFont()
          };
        } else {
          // Get a random default prompt that's different from the current one
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * defaultEncouragingPrompts.length);
          } while (
            currentPrompt && 
            defaultEncouragingPrompts[randomIndex].text === currentPrompt.text
          );
          
          newPrompt = {
            ...defaultEncouragingPrompts[randomIndex],
            font: getRandomFont()
          };
        }
      } else {
        const promptType = Math.random();
        if (promptType < 0.4) {
          const writingPrompt = await fetchWritingPrompt();
          newPrompt = { ...writingPrompt, font: getRandomFont() };
        } else if (promptType < 0.7) {
          // Get a random art prompt that's different from the current one
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * artPrompts.length);
          } while (
            currentPrompt && 
            artPrompts[randomIndex].text === currentPrompt.text
          );
          
          newPrompt = {
            ...artPrompts[randomIndex],
            font: getRandomFont()
          };
        } else {
          // Get a random music prompt that's different from the current one
          let randomIndex;
          do {
            randomIndex = Math.floor(Math.random() * musicPrompts.length);
          } while (
            currentPrompt && 
            musicPrompts[randomIndex].text === currentPrompt.text
          );
          
          newPrompt = {
            ...musicPrompts[randomIndex],
            font: getRandomFont()
          };
        }
      }

      setTimeout(() => {
        setCurrentPrompt(newPrompt);
        setIsAnimating(false);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error getting prompt:', error);
      setIsAnimating(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Inspiration Button
      </h1>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`relative w-48 h-48 rounded-full bg-indigo-600 border-4 border-white/30
            transform transition-all duration-300 hover:scale-105
            ${isAnimating ? 'animate-pulse-slow' : ''}
            ${isClicking ? 'animate-click' : ''}
            shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className="absolute inset-0 rounded-full bg-white opacity-10 animate-pulse"></div>
          <span className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            {isLoading ? 'Loading...' : 'Click Me!'}
          </span>
        </button>

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleSmallButtonClick}
            className={`relative w-20 h-20 rounded-full bg-indigo-600 border-2 border-white/30
              transform transition-all duration-300 hover:scale-105
              ${isClicking ? 'animate-click' : ''}
              shadow-lg hover:shadow-xl`}
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-10 animate-pulse"></div>
            <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
              {isEncouraging ? 'Encourage' : 'Create'}
            </span>
          </button>
          <span className="text-white text-sm font-medium w-24 text-center">
            {isEncouraging ? 'Click me for inspiration' : 'Click me for encouragement'}
          </span>
        </div>
      </div>

      {currentPrompt && (
        <div className="mt-8 p-6 bg-white/10 backdrop-blur-lg rounded-lg max-w-md w-full">
          <div className="text-white text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2
              ${currentPrompt.type === 'writing' ? 'bg-blue-500' : 
                currentPrompt.type === 'art' ? 'bg-green-500' : 
                currentPrompt.type === 'music' ? 'bg-purple-500' :
                'bg-pink-500'}`}>
              {currentPrompt.type.charAt(0).toUpperCase() + currentPrompt.type.slice(1)}
            </span>
            <p className={`text-xl mt-2 ${currentPrompt.font}`}>
              {currentPrompt.text}
            </p>
            {currentPrompt.author && (
              <p className="text-sm mt-2 text-gray-300">Quote by: {currentPrompt.author}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 