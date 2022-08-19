import type { NextPage } from 'next'
import {getAllPostsForHome} from "../../lib/api";

const Home: NextPage = () => {
  return <div>
    <h1 className="text-3xl font-bold">Home</h1>
  </div>
}


export const getServerSideProps = async () => {

  const books = await getAllPostsForHome()
  console.log({books});

  return {props: {}}
}

export default Home
