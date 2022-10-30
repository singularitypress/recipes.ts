// Import the generated Lists API and types from Keystone
import { query } from ".keystone/api";
import Head from "next/head";
import { useContext } from "react";
import { ThemeContext } from "@components/context";
import Link from "next/link";
import { Container } from "@components/atomic";

type TPost = {
  slug: string;
  title: string;
  hero: {
    bgLight: null | {
      publicUrlTransformed: string;
    };
    bgDark: null | {
      publicUrlTransformed: string;
    };
  };
};

// Home receives a `posts` prop from `getStaticProps` below
export default ({ posts = [] }: { posts: TPost[] }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </button>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(({ slug, title, hero }) => (
            <li key={slug}>
              <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href={`/recipes/${slug}`}>
                  {hero?.bgLight?.publicUrlTransformed && (
                    <picture>
                      <source
                        srcSet={hero.bgLight.publicUrlTransformed}
                        type="image/webp"
                      />
                      <img
                        className="rounded-t-lg"
                        src={hero.bgLight.publicUrlTransformed}
                        alt=""
                      />
                    </picture>
                  )}
                </a>
                <div className="p-5">
                  <a href={`/recipes/${slug}`}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-eerie-black dark:text-isabelline">
                      {title}
                    </h5>
                  </a>
                  <a
                    href={`/recipes/${slug}`}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-eerie-black dark:text-isabelline bg-mango rounded-lg hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-medium-state-blue dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const posts = (await query.Post.findMany({
    query: `slug title hero { bgLight { publicUrlTransformed(transformation: {fetch_format:"auto"}) } }`,
  })) as TPost[];
  return {
    props: {
      posts,
    },
  };
};
