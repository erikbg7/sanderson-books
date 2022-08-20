import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="absolute right-0 left-0 px-3 py-2 bg-gray-800">
      <div className="flex justify-between items-center mx-auto md:w-[85%]">
        <div className="flex items-center">
          <div className="relative my-1 mx-4 w-64 h-12 ">
            <Image alt="logo" sizes="50vw" src="/sanderson_logo.webp" layout="fill" />
          </div>
          {/*<Link href="/results">*/}
          {/*  <a className="text-2xl hover:text-gray-400">Results</a>*/}
          {/*</Link>*/}
        </div>
        <div className="flex items-center">
          <span className="text-sm">by Erik Blanca</span>
          {/*<a*/}
          {/*  className="ml-4"*/}
          {/*  title="Link to LinkedIn profile"*/}
          {/*  href="https://www.linkedin.com/in/erik-blanca-gomez-32455a162/"*/}
          {/*>*/}
          {/*  <FaLinkedin size={24} />*/}
          {/*</a>*/}
          {/*<a className="ml-4" title="Link to GitHub profile" href="https://www.github.com/erikbg7">*/}
          {/*  <FaGithub size={24} />*/}
          {/*</a>*/}
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
