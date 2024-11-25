interface Question {
  questionText: string;
  wordBank: string[];
  given: Record<string, string>;
  correctAnswers: Record<string, string>;
}

const items = [
  { singular: 'sticker', plural: 'stickers', context: 'craft' },
  { singular: 'cupcake', plural: 'cupcakes', context: 'food' },
  { singular: 'balloon', plural: 'balloons', context: 'party' },
  { singular: 'crayon', plural: 'crayons', context: 'art' },
  { singular: 'cookie', plural: 'cookies', context: 'food' },
  { singular: 'marble', plural: 'marbles', context: 'game' },
  { singular: 'toy car', plural: 'toy cars', context: 'toy' },
  { singular: 'lollipop', plural: 'lollipops', context: 'candy' },
  { singular: 'puzzle piece', plural: 'puzzle pieces', context: 'game' },
  { singular: 'trading card', plural: 'trading cards', context: 'game' },
  { singular: 'pencil', plural: 'pencils', context: 'school' },
  { singular: 'eraser', plural: 'erasers', context: 'school' },
  { singular: 'book', plural: 'books', context: 'library' },
  { singular: 'candy bar', plural: 'candy bars', context: 'candy' },
  { singular: 'flower', plural: 'flowers', context: 'garden' },
  { singular: 'seed packet', plural: 'seed packets', context: 'garden' },
  { singular: 'paint brush', plural: 'paint brushes', context: 'art' },
  { singular: 'building block', plural: 'building blocks', context: 'toy' },
  { singular: 'comic book', plural: 'comic books', context: 'library' },
  { singular: 'juice box', plural: 'juice boxes', context: 'food' }
];

const templates = [
  {
    text: 'You\'re planning a birthday party! You have {dividend} {itemPlural} to share among {divisor} party bags. How many {itemPlural} will go in each bag, and will there be any extra {itemPlural}?',
    given: ['Total {itemPlural}', 'Number of party bags'],
    answers: ['{ItemPlural} per bag', 'Extra {itemPlural}'],
    context: 'party'
  },
  {
    text: 'Your class is going on a field trip! The teacher has {dividend} {itemPlural} and wants to give the same number to each of the {divisor} groups. How many {itemPlural} will each group get, and how many extra {itemPlural} will be left?',
    given: ['Total {itemPlural}', 'Number of groups'],
    answers: ['{ItemPlural} per group', 'Leftover {itemPlural}'],
    context: 'school'
  },
  {
    text: 'The school library received {dividend} new {itemPlural}. The librarian wants to display them equally on {divisor} shelves. How many {itemPlural} should go on each shelf, and how many extra {itemPlural} will there be?',
    given: ['Total {itemPlural}', 'Number of shelves'],
    answers: ['{ItemPlural} per shelf', 'Extra {itemPlural}'],
    context: 'library'
  },
  {
    text: 'You\'re organizing a game! You have {dividend} {itemPlural} and want to create {divisor} equal teams. How many {itemPlural} should each team get, and how many extra {itemPlural} will be left?',
    given: ['Total {itemPlural}', 'Number of teams'],
    answers: ['{ItemPlural} per team', 'Extra {itemPlural}'],
    context: 'game'
  },
  {
    text: 'Mom bought {dividend} {itemPlural} and wants to pack them into {divisor} lunch boxes equally. How many {itemPlural} will go in each lunch box, and how many extra {itemPlural} will she have?',
    given: ['Total {itemPlural}', 'Number of lunch boxes'],
    answers: ['{ItemPlural} per lunch box', 'Extra {itemPlural}'],
    context: 'food'
  },
  {
    text: 'The art teacher has {dividend} {itemPlural} for the class project. If there are {divisor} tables of students, how many {itemPlural} should each table get, and how many extra {itemPlural} will there be?',
    given: ['Total {itemPlural}', 'Number of tables'],
    answers: ['{ItemPlural} per table', 'Extra {itemPlural}'],
    context: 'art'
  },
  {
    text: 'You\'re helping in the garden! There are {dividend} {itemPlural} to plant in {divisor} rows. How many {itemPlural} should go in each row, and how many extra {itemPlural} will there be?',
    given: ['Total {itemPlural}', 'Number of rows'],
    answers: ['{ItemPlural} per row', 'Extra {itemPlural}'],
    context: 'garden'
  },
  {
    text: 'The toy store is organizing their shelves. They have {dividend} {itemPlural} to arrange in {divisor} display cases. How many {itemPlural} should go in each case, and how many extra {itemPlural} will they have?',
    given: ['Total {itemPlural}', 'Number of display cases'],
    answers: ['{ItemPlural} per case', 'Extra {itemPlural}'],
    context: 'toy'
  },
  {
    text: 'Your class is having a party! You have {dividend} {itemPlural} to share with {divisor} tables. How many {itemPlural} should each table get, and how many extra {itemPlural} will be left?',
    given: ['Total {itemPlural}', 'Number of tables'],
    answers: ['{ItemPlural} per table', 'Extra {itemPlural}'],
    context: 'party'
  },
  {
    text: 'The candy store is making gift bags. They have {dividend} {itemPlural} to put into {divisor} bags. How many {itemPlural} should go in each bag, and how many extra {itemPlural} will they have?',
    given: ['Total {itemPlural}', 'Number of bags'],
    answers: ['{ItemPlural} per bag', 'Extra {itemPlural}'],
    context: 'candy'
  }
];

let usedQuestions = new Set<string>();

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generateUniqueQuestion(level: string): Question {
  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const matchingItems = items.filter(item => 
      template.context === 'any' || item.context === template.context
    );
    const item = matchingItems.length > 0 
      ? matchingItems[Math.floor(Math.random() * matchingItems.length)]
      : items[Math.floor(Math.random() * items.length)];

    let minDividend, maxDividend;
    switch (level) {
      case 'easy':
        minDividend = 10;
        maxDividend = 99;
        break;
      case 'medium':
        minDividend = 100;
        maxDividend = 999;
        break;
      case 'hard':
        minDividend = 1000;
        maxDividend = 9999;
        break;
      default:
        minDividend = 10;
        maxDividend = 99;
    }

    const dividend = getRandomInt(minDividend, maxDividend);
    const divisor = getRandomInt(2, 9);
    
    // Create a unique key for this question combination
    const questionKey = `${template.text}-${item.plural}-${dividend}-${divisor}`;
    
    if (!usedQuestions.has(questionKey)) {
      usedQuestions.add(questionKey);
      
      const quotient = Math.floor(dividend / divisor);
      const remainder = dividend % divisor;

      const replacePlaceholders = (str: string) => {
        return str
          .replace(/{dividend}/g, dividend.toString())
          .replace(/{divisor}/g, divisor.toString())
          .replace(/{item}/g, item.singular)
          .replace(/{itemPlural}/g, item.plural)
          .replace(/{ItemPlural}/g, capitalize(item.plural));
      };

      const questionText = replacePlaceholders(template.text);
      const given: Record<string, string> = {};
      template.given.forEach(key => {
        given[replacePlaceholders(key)] = '';
      });

      const correctAnswers: Record<string, string> = {
        [replacePlaceholders(template.given[0])]: dividend.toString(),
        [replacePlaceholders(template.given[1])]: divisor.toString(),
        [replacePlaceholders(template.answers[0])]: quotient.toString(),
        [replacePlaceholders(template.answers[1])]: remainder.toString()
      };

      return {
        questionText,
        wordBank: [item.plural, dividend.toString(), divisor.toString()],
        given,
        correctAnswers
      };
    }
    
    attempts++;
  }
  
  // If we can't generate a unique question, clear the used questions and try once more
  usedQuestions.clear();
  return generateUniqueQuestion(level);
}

export function generateQuestion(level: string): Question {
  return generateUniqueQuestion(level);
}

// Reset used questions when starting a new game
export function resetQuestions(): void {
  usedQuestions.clear();
}