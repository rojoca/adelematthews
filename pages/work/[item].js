import { getItems, getItem } from "../api";
import React from "react";
import { Image, Transformation } from "cloudinary-react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "NZD"
});

const dtf = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short"
});

function P({ children, classNames }) {
  let cls = "mb-4";
  if (classNames) {
    cls = `${classNames} ${cls}`;
  }
  return <p className={cls}>{children}</p>;
}

export default function Item({ item }) {
  const data = item.context.custom;

  if (data.date) {
    data.date = dtf.format(new Date(data.date));
  }

  return (
    <div className="flex flex-col sm:flex-row flex-wrap">
      <h1 className="w-full font-titles uppercase text-2xl text-gray-600 mb-8">
        {data.caption}
      </h1>
      <Image
        cloudName="rojoca"
        publicId={item.public_id}
        className="w-full sm:w-1/2 md:w-2/3"
      >
        <Transformation aspectRatio="1" crop="crop" />
      </Image>
      <div className="w-full text-sm text-gray-700 sm:w-1/2 md:w-1/3 sm:pl-8 pt-4 sm:pt-0">
        {data.alt && <P>{data.alt}</P>}
        {data.dimensions && <P>{data.dimensions}</P>}
        {data.price && (
          <P classNames="italic">{formatter.format(data.price)}</P>
        )}
        {data.materials && <P>{data.materials}</P>}
        {data.date && <P>{data.date}</P>}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const items = await getItems();

  // Get the paths we want to pre-render based on posts
  const paths = items.resources.map(item => ({
    params: { item: item.public_id }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const item = await getItem(params.item);

  // Pass post data to the page via props
  return { props: { item } };
}
