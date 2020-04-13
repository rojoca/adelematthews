import { getItems, getItem } from "../api";
import React from "react";
import { Image, Transformation } from "cloudinary-react";
import { motion } from "framer-motion";

const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
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
      <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-8">
        Work
      </h1>
      <Image
        cloudName="rojoca"
        publicId={item.public_id}
        className="w-full sm:w-1/2 md:w-2/3 shadow-lg"
      >
        <Transformation aspectRatio="1" crop="crop" />
      </Image>
      <div className="w-full text-sm text-gray-700 sm:w-1/2 md:w-1/3 sm:pl-8 pt-4 sm:pt-0">
        <motion.div
          className="p-2"
          transition={{ duration: 3 }}
          animate={{
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          }}
        >
          <p className="font-bold">{data.caption}</p>
          {data.alt && <p className="text-xs">{data.alt}</p>}
          {data.price && (
            <P classNames="italic uppercase">${formatter.format(data.price)}</P>
          )}
          {(data.materials || data.date) && (
            <div className="flex flex-row items-end justify-between text-xs text-gray-500">
              {data.materials && (
                <span>
                  {data.dimensions}
                  <br />
                  {data.materials}
                </span>
              )}
              {data.date && <span>{data.date}</span>}
            </div>
          )}
        </motion.div>
        <div className="mt-4 p-2 text-xs text-right text-gray-500">
          <span>share | enquire</span>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const items = await getItems();
  console.log(items);

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
