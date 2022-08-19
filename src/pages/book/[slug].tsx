import React from 'react';
import { NextPage } from 'next';
import { getAllBooksSlugs, getBookBySlug } from '../../../lib/api';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

type Props = {
  book: any;
};

const BookPage: NextPage<Props> = ({ book }) => {
  return (
    <div className="flex max-w-5xl mx-auto py-24">
      <div key={book.slug} className="relative w-60 h-80 rounded-md overflow-hidden mx-4">
        <Image src={book.image.url} alt={book.title} layout="fill" />
      </div>
      <section className="flex-1">
        <div className="flex flex-col">
          <div>Title: {book.title}</div>
          <div>Year: {book.year}</div>
        </div>
        <hr />
        <div>{documentToReactComponents(book.description.json)}</div>
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
