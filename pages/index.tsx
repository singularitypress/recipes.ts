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
          Toggle theme, currently: {theme}
        </button>
        <ul>
          {posts.map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/recipes/${slug}`}>{title}</Link>
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
