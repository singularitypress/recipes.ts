// Import the generated Lists API and types from Keystone
import { query } from ".keystone/api";
import Head from "next/head";
import { ImageHero, VideoHero } from "@components/organism";
import { useContext } from "react";
import { ThemeContext } from "@components/context";

type THero = {
  id: string;
  title: string;
  subTitle?: string;
  ctaText?: string;
  ctaURL?: string;
  bgLight?: {
    publicUrlTransformed: string;
  };
  bgDark?: {
    publicUrlTransformed: string;
  };
  vidLight?: string;
  vidDark?: string;
  backgroundType: "image" | "video";
  slug: string;
};

// Home receives a `posts` prop from `getStaticProps` below
export default ({ hero }: { hero: THero }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      {hero.backgroundType === "image" ? (
        <ImageHero {...hero} />
      ) : (
        <VideoHero
          darkBg={hero.vidDark ?? ""}
          bg={hero.vidLight ?? ""}
          overlay={true}
        >
          <h1 className="hero__title">{hero.title}</h1>
          <div className="hero__subtitle">
            <p>{hero.subTitle}</p>
          </div>
          <a href={hero.ctaURL} className="hero__cta w-fit">
            {hero.ctaText}
          </a>
        </VideoHero>
      )}
    </>
  );
};

export const getStaticProps = async () => {
  const hero = (await query.Hero.findOne({
    where: { slug: "home" },
    query:
      "id title subTitle ctaText ctaURL bgLight { publicUrlTransformed } bgDark { publicUrlTransformed } vidLight vidDark backgroundType",
  })) as THero;
  if (!hero) {
    return { notFound: true };
  }
  return { props: { hero } };
};
