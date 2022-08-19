import React from 'react';
import { NextPage } from 'next';
import { getAllBooksSlugs, getBookBySlug } from '../../../lib/api';

type Props = {
  book: any;
};

const BookPage: NextPage<Props> = ({ book }) => {
  console.log({ book });
  return <div>Book Page</div>;
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
  console.log({ slug });
  const bookData = await getBookBySlug(slug);

  return {
    props: {
      book: bookData,
    },
  };
};

export default BookPage;
