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
  return (
    <div className="flex max-w-5xl mx-auto py-24">
      <div>
        <div className="sticky top-0">
          <div key={book.slug} className="relative w-60 h-80 rounded-md overflow-hidden mr-6">
            <Image src={book.image.url} alt={book.title} layout="fill" />
          </div>
          <div className="flex flex-col px-2 py-4">
            <span className="text-lg font-semibold">{book.title}</span>
            <span className=" text-gray-400">{book.year}</span>
          </div>
        </div>
      </div>
      <section className="flex-1">
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
