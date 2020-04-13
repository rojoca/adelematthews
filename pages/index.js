import { getItems } from "./api";
import React from "react";
import Link from "next/link";
import { Image, Transformation } from "cloudinary-react";

function Item({ item }) {
  const data = item.context.custom;
  return (
    <Link href="/work/[item]" as={`/work/${item.public_id}`}>
      <figure className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
        <Image cloudName="rojoca" publicId={item.public_id}>
          <Transformation aspectRatio="1" crop="crop" />
        </Image>
        <figcaption className="text-gray-600 uppercase text-sm py-2">
          {data.caption}
        </figcaption>
      </figure>
    </Link>
  );
}

export default function Home({ items }) {
  return (
    <div className="flex flex-col">
      <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-4">
        Work
      </h1>

      <div className="text-sm text-gray-700 w-full md:w-1/2 lg:w-1/3 mb-8">
        <div className="">
          <p className="mb-2">
            Welcome. I am a New Zealand artist working out of my studio at
            Sacred Heart Girls’ College Hamilton.
          </p>
          <p className="">
            This website aims to make my art available to anyone interested in
            art of a New Zealand nature and character.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row -mx-4">
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
    props: { items: items.resources } // will be passed to the page component as props
  };
}
