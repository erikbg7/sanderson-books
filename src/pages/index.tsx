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
    <section className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Home</h1>
      <div className="flex flex-col">
        {lists.map((list) => {
          return (
            !!list.books.length && (
              <div key={list.title} className="flex flex-col items-center mt-24">
                <h2 className="text-2xl font-bold">{list.title}</h2>
                <div className="flex flex-wrap">
                  {list.books.map((book) => {
                    return (
                      <div key={book.slug} className="flex flex-col items-center">
                        <h3 className="text-xl font-bold">{book.title}</h3>
                        <div className="relative w-40 h-60">
                          <Image src={book.image.url} alt={book.title} layout="fill" />
                        </div>
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

export const getServerSideProps = async () => {
  const sagas = await getAllSagas();

  const imagesRequests = sagas.map(async ({ title }: { title: string }) =>
    getBooksImagesBySaga(title)
  );

  const lists = await Promise.all(imagesRequests);

  return { props: { lists } };
};

export default Home;
