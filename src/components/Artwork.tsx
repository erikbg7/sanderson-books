import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Book = {
  slug: string;
  title: string;
  year: number;
  summary: string;
  image: { url: string };
};

type Props = {
  book: Book;
};

const Artwork: React.FC<Props> = ({ book }) => {
  return (
    <Link href={`/book/${book.slug}`}>
      <a className="relative w-48 h-72 rounded-md overflow-hidden m-4 transition hover:scale-105 ">
        <Image src={book.image.url} alt={book.title} layout="fill" />
      </a>
    </Link>
  );
};

export { Artwork };
