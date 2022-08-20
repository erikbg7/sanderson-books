import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BookArtwork } from '../../models';

type Props = {
  book: BookArtwork;
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
