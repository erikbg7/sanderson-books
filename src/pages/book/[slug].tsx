import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getAllBooksSlugs, getBookBySlug, getBooksImagesBySaga } from '../../../lib/api';
import { Artwork } from '../../components/Artwork';

type Props = {
  book: any;
  recommendations: any[];
};

const options = {
  renderNode: {
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className="text-2xl text-bold mt-4 mb-2">{children}</h4>
    ),
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="text-xl text-gray-300">{children}</p>
    ),
  },
};

const BookPage: NextPage<Props> = ({ book, recommendations }) => {
  return (
    <div className="flex flex-col py-24 ">
      <div className="relative w-[70%] h-[40vh] rounded-md overflow-hidden mx-auto rounded-xl overflow-hidden">
        <Image src={book.saga.image.url} alt={book.saga.title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex max-w-6xl mx-auto ">
        <div className="relative -top-24 w-60 h-80 rounded-md overflow-hidden mr-8">
          <Image src={book.image.url} alt={book.title} layout="fill" />
        </div>
        <div className="flex-1 py-6">
          <div className="flex items-center">
            <h1 className="text-3xl text-gray-200 font-semibold">{book.title}</h1>
            <span className="text-sm px-2 mx-6 bg-gray-600 rounded-md">{book.year}</span>
          </div>
          <h2 className="text-lg text-gray-400 font-semibold">{book.saga.title}</h2>
          <p className="text-lg text-gray-300 mt-4">{book.summary}</p>
        </div>
      </div>
      <section className="max-w-6xl mx-auto">
        <div>{documentToReactComponents(book.description.json, options)}</div>
      </section>
      <section className="flex flex-col w-[70%] mx-auto py-20">
        <hr />
        <h2 className="text-4xl mb-4 mt-8">Similar books</h2>
        <div className="flex">
          {recommendations.map((recommendation) => (
            <Artwork key={recommendation.slug} book={recommendation} />
          ))}
        </div>
      </section>
    </div>
  );
};

export const getStaticPaths = async () => {
  const slugs = await getAllBooksSlugs();

  return {
    paths: slugs.map(({ slug }: { slug: string }) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { slug } = params;
  const bookData = await getBookBySlug(slug);
  const recommendations = await getBooksImagesBySaga(bookData.saga.title);

  return {
    props: {
      book: bookData,
      recommendations: recommendations.books.filter((book: any) => book.slug !== slug),
    },
  };
};

export default BookPage;
