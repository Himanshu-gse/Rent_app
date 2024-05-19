import { Link } from "react-router-dom";
import home from "/home.jpg";
const Home = () => {
  return (
    // <main className='flex w-[90%] mx-auto h-[90vh] items-center justify-center gap-[10rem]'>
    //   <h1 className='text-5xl'>
    //     Welcome to new world of <br /> Renting
    //   </h1>
    //   <img src={home} alt='home illustration' className='h-[30rem]' />
    // </main>
    <div className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
        <p className="text-sm font-semibold text-gray-700">
        Where Renting Meets Simplicity
        </p>
      </div>
      <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
      Getting difficult to find <span className="text-blue-600"> rents?</span> especially in cities.
      </h1>
      <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
      Rents have gone up and it is now getting difficult to find rents, especially in cities with high population and IT offices.
      </p>
      <Link
        href="/dashboard"
        // target="_blank"
      >
        Get Started
      </Link>
    </div>
  );
};
export default Home;
