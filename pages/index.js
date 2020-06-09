import Head from "next/head";
import Link from "next/link";
import { getItems } from "./api";
import React from "react";
import { Image, Transformation } from "cloudinary-react";

function Item({ item }) {
  const data = item.context.custom;
  return (
    <Link href="/work/[item]" as={`/work/${item.public_id}`}>
      <a className="cursor-pointer w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
        <figure>
          <Image cloudName="rojoca" publicId={item.public_id} secure>
            <Transformation aspectRatio="1" crop="crop" />
          </Image>
          <figcaption className="text-gray-600 uppercase text-sm py-2 text-center">{data.caption}</figcaption>
        </figure>
      </a>
    </Link>
  );
}

export default function Home({ items }) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Adele Matthews - New Zealand Artist</title>
        <meta property="og:url" content="https://adelematthews.nz/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Adele Matthews - New Zealand Artist" />
        <meta
          property="og:description"
          content="Welcome. I am a New Zealand artist working in Wellington."
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/rojoca/image/upload/w_300,ar_1/${items[0].public_id}`}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content="Adele Matthews - New Zealand Artist" />
        <meta property="twitter:description" content="New Zealand artist working in Wellington." />
        <meta
          property="twitter:image"
          content={`https://res.cloudinary.com/rojoca/image/upload/w_300,ar_1/${items[0].public_id}`}
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-4 text-center">Work</h1>

      <div className="text-sm text-gray-700 w-full md:w-1/2 lg:w-1/3 mb-8 text-center">
        <div className="mx-auto">
          <p className="mb-2">Welcome. I am a New Zealand artist working in Wellington.</p>
          <p className="">
            This website aims to make my art available to anyone interested in art of a New Zealand
            nature and character.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap -mx-4 mt-8">
        {items.map(item => (
          <Item item={item} key={item.public_id} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const items = await getItems();

  return {
    props: { items: items.resources }, // will be passed to the page component as props
  };
}
