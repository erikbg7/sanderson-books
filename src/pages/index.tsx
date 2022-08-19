import type { NextPage } from 'next';
import { getAllSagas, getBooksImagesBySaga } from '../../lib/api';
import Image from 'next/image';

type Book = {
  slug: string;
  title: string;
  year: number;
  summary: string;
  image: { url: string };
};

type BookList = {
  title: string;
  books: Book[];
};

type Props = {
  lists: BookList[];
};

const Home: NextPage<Props> = ({ lists = [] }) => {
  console.log(lists);

  return (
    <section className="flex flex-col items-start max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold">Home</h1>
      <div className="flex flex-col">
        {lists.map((list) => {
          return (
            !!list.books.length && (
              <div key={list.title} className="flex flex-col items-start mt-16">
                <h2 className="text-2xl text-gray-200 font-bold my-8">{list.title}</h2>
                <div className="flex flex-wrap">
                  {list.books.map((book) => {
                    return (
                      <div
                        key={book.slug}
                        className="relative w-48 h-72 rounded-md overflow-hidden mx-4"
                      >
                        <Image src={book.image.url} alt={book.title} layout="fill" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}
      </div>
    </section>
  );
};

export const getStaticProps = async () => {
  const sagas = await getAllSagas();
  const requests = sagas.map(async ({ title }: { title: string }) => getBooksImagesBySaga(title));
  const lists = await Promise.all(requests);

  return { props: { lists } };
};

export default Home;
