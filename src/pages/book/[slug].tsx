import React from 'react';
import { NextPage } from 'next';
import { getAllBooksSlugs, getBookBySlug } from '../../../lib/api';
import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

type Props = {
  book: any;
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

const BookPage: NextPage<Props> = ({ book }) => {
  console.log({ book });

  return (
    <div className="flex flex-col py-24 ">
      <div className="relative w-[70%] h-[40vh] rounded-md overflow-hidden mx-auto rounded-xl overflow-hidden">
        <Image src={book.saga.image.url} alt={book.saga.title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex max-w-6xl mx-auto ">
        <div className="relative -top-24 w-60 h-80 rounded-md overflow-hidden mr-8">
          <Image src={book.image.url} alt={book.title} layout="fill" />
        </div>
        <div className="flex-1 py-8">
          <h1>
            {book.title} - {book.year}
          </h1>
          <h2 className="text-lg font-semibold">{book.saga.title}</h2>
          <p>{book.summary}</p>
        </div>
      </div>
      <section className="max-w-6xl mx-auto">
        <div>{documentToReactComponents(book.description.json, options)}</div>
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

  return {
    props: {
      book: bookData,
    },
  };
};

export default BookPage;
