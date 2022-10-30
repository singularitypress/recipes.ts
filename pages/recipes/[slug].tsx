import { GetStaticPathsResult, GetStaticPropsContext } from "next";
import Link from "next/link";

import { query } from ".keystone/api";
import Head from "next/head";
import { readFileSync } from "fs";
import { resolve } from "path";
import html from "remark-html";
import { Container } from "@components/atomic";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import sanitize from "sanitize-html";

interface IPost {
  title: string;
  slug: string;
  hero: {
    bgLight: null | {
      publicUrlTransformed: string;
    };
    bgDark: null | {
      publicUrlTransformed: string;
    };
  };
}

interface IProps {
  post: IPost;
  content: string;
}

export default ({ post, content }: IProps) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main>
        {post?.hero?.bgLight?.publicUrlTransformed && (
          <picture>
            <source
              srcSet={post.hero.bgLight.publicUrlTransformed}
              type="image/webp"
            />
            <img
              className="w-screen h-screen md:h-96 object-cover"
              src={post.hero.bgLight.publicUrlTransformed}
              alt="sprinkles"
            />
          </picture>
        )}
        <Container className="mt-10">
          <div>
            <Link href="/">
              <a>&larr; back home</a>
            </Link>
          </div>
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: sanitize(content, {
                allowedTags: [
                  "p",
                  "a",
                  "h1",
                  "h2",
                  "h3",
                  "h4",
                  "h5",
                  "h6",
                  "ol",
                  "li",
                  "table",
                  "thead",
                  "tbody",
                  "tr",
                  "td",
                  "th",
                  "pre",
                  "code",
                  "em",
                  "strong",
                ],
              }),
            }}
          ></div>
        </Container>
      </main>
    </>
  );
};

export const getStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const posts = (await query.Post.findMany({
    query: `slug`,
  })) as { slug: string }[];

  const paths = posts
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => `/recipes/${slug}`);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = (await query.Post.findOne({
    where: { slug: params!.slug as string },
    query: `
    title
    slug
    hero {
      bgLight {
        publicUrlTransformed (transformation: {fetch_format:"auto"})
      }
      bgDark {
        publicUrlTransformed (transformation: {fetch_format:"auto"})
      }
    }`,
  })) as IPost | null;
  if (!post) {
    return { notFound: true };
  }
  const content = (
    await remark()
      .use(remarkGfm)
      .use(html)
      .process(
        readFileSync(resolve(`content/recipes/${post.slug}.md`), {
          encoding: "utf-8",
        })
      )
  ).toString();
  return { props: { post, content } };
};
