import React from "react";
import { Post } from "../../atoms/postsAtom";
import Head from "next/head";

type HeadTagProps = {
  posts: Post[];
};

const HeadTag: React.FC<HeadTagProps> = ({ posts }) => {
  const metaDescription = posts
    ?.slice(0, 10)
    ?.map((post) => post.title)
    ?.join(", ");

  // Define discData with dynamically populated description and other details
  const discData = {
    title: "Sengoku Social",
    description: metaDescription,
    coverimage: "images/samurailogo.png",
  };

  // Set up structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: discData.title,
    author: {
      "@type": "Person",
      name: "Arpan Kumar Lahiri",
    },
    description: discData.description,
    image: discData.coverimage,
    // Additional structured data properties can go here
  };

  return (
    <Head>
      <title>{discData.title}</title>
      <link rel="icon" type="image/png" href={discData.coverimage} />
      <meta itemProp="description" content={discData.description} />
      <meta itemProp="thumbnailUrl" content={discData.coverimage} />
      <meta itemProp="name" content={discData.title} />
      <meta property="og:image" content={discData.coverimage} />
      <meta property="og:title" content={discData.title} />
      <meta property="og:description" content={discData.description} />
      <meta property="og:image" content={discData.coverimage} />
      <meta name="twitter:title" content={discData.title} />
      <meta name="twitter:description" content={discData.description}></meta>
      <meta name="twitter:image" content={discData.coverimage}></meta>
      <script type="application/ld+json" key="event-jsonld">
        {JSON.stringify(structuredData)}
      </script>
    </Head>
  );
};
export default HeadTag;
