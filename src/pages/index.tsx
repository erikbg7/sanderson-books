import type { NextPage } from 'next';
import { getAllBooksImages } from '../../lib/api';
import Image from 'next/image';

type Book = {
  slug: string;
  title: string;
  year: number;
  summary: string;
  image: { url: string };
};

type Props = {
  books: Book[];
};

const Home: NextPage<Props> = ({ books = [] }) => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Home</h1>
      <div className="flex flex-col">
        {books.map((book) => (
          <div key={book.slug} className="flex flex-col">
            {book.title}
            <div className="relative w-40 h-60">
              <Image src={book.image.url} alt={book.title} layout="fill" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const getServerSideProps = async () => {
  const books = await getAllBooksImages();
  console.log({ books });
  return { props: { books } };
};

export default Home;
