type Book = {
  title: string;
  rating: number;
};

type TitleMapper<T> = (book: T) => string;
type RatingMapper<T> = (book: T) => number;

const books: Readonly<Book[]> = [
  {
    title: 'Ulysses',
    rating: 9
  },
  {
    title: 'Steppenwolf',
    rating: 10
  },
  {
    title: '1984',
    rating: 8
  },

  {
    title: 'Fahrenheit 451',
    rating: 10
  }
];

const ratingMapper: RatingMapper<Book> = book => book.rating;
const titleMapper: TitleMapper<Book> = book => book.title;

const highestBookRating = Math.max(...books.map(ratingMapper));

const getBooksWithTheHighestRating = <T>(
  books: readonly T[],
  ratingMapper: RatingMapper<T>,
  titleMapper: TitleMapper<T>
) =>
  books.reduce((acc, book) => {
    if (ratingMapper(book) === highestBookRating) {
      acc.push(titleMapper(book));
    }

    return acc;
  }, []);

const highestRatedBooks = getBooksWithTheHighestRating(
  books,
  ratingMapper,
  titleMapper
);

console.log({ highestRatedBooks });

const getAverageRating = <T>(
  books: readonly T[],
  ratingMapper: RatingMapper<T>
) => books.reduce((acc, book) => acc + ratingMapper(book), 0) / books.length;

const averageRating = getAverageRating(books, ratingMapper);

console.log({ averageRating });
