import Head from "next/head";
import Link from "next/link";
import { getItems, getItem } from "../api";
import React from "react";
import { Image, Transformation } from "cloudinary-react";
import { motion } from "framer-motion";
import TwitterIcon from "../../components/TwitterIcon";
import FacebookIcon from "../../components/FacebookIcon";

const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  currency: "NZD",
});

const dtf = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
});

function price(value) {
  if (isNaN(value)) {
    return "";
  }
  return `$${formatter.format(value)}`;
}

function P({ children, classNames }) {
  let cls = "mb-4";
  if (classNames) {
    cls = `${classNames} ${cls}`;
  }
  return <p className={cls}>{children}</p>;
}

export default function Item({ item }) {
  const data = item.context.custom;

  const variants = {
    visible: {
      opacity: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hidden: { opactiy: 0 },
  };

  const description = data.alt && data.alt !== "undefined" ? data.alt : "New Zealand Art";

  return (
    <div className="flex flex-col sm:flex-row flex-wrap">
      <Head>
        <title>Adele Matthews - {data.caption}</title>
        <meta property="og:url" content={`https://adelematthews.nz/work/${item.public_id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`Adele Matthews - ${data.caption}`} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/rojoca/image/upload/w_300,ar_1/${item.public_id}`}
        />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={`Adele Matthews - ${data.caption}`} />
        <meta property="twitter:description" content={description} />
        <meta
          property="twitter:image"
          content={`https://res.cloudinary.com/rojoca/image/upload/w_300,ar_1/${item.public_id}`}
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-8">Work</h1>
      <Image
        cloudName="rojoca"
        publicId={item.public_id}
        className="w-full sm:w-1/2 md:w-2/3 shadow-lg"
        secure
      >
        <Transformation aspectRatio="1" crop="crop" />
      </Image>
      <div className="w-full text-sm text-gray-700 sm:w-1/2 md:w-1/3 sm:pl-8 pt-4 sm:pt-0">
        <motion.div
          className="p-2 shadow-md"
          transition={{ duration: 3 }}
          animate="visible"
          initial="hidden"
          variants={variants}
        >
          <p className="font-bold">{data.caption}</p>
          {data.alt && <p className="text-xs">{data.alt}</p>}
          {data.price && !isNaN(data.price) && (
            <P classNames="italic uppercase">{price(data.price)}</P>
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
              {data.date && <span>{data.formatted_date}</span>}
            </div>
          )}
        </motion.div>
        <div className="mt-4 p-2 text-xs flex items-center text-right text-gray-500 justify-between">
          <div className="flex-grow flex items-center">
            <a
              target="_blank"
              href={`https://twitter.com/intent/tweet?url=https://adelematthews.nz/work/${item.public_id}`}
              className="mr-2 text-gray-200 hover:text-gray-500"
            >
              <TwitterIcon className="h-4 w-4" />
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=https://adelematthews.nz/work/${item.public_id}`}
              className="text-gray-200 hover:text-gray-500"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>
          <Link
            href={`/enquiries?workId=${item.public_id}&caption=${data.caption}&alt=${data.alt}`}
          >
            <a className="text-gray-300 hover:text-gray-600">enquire</a>
          </Link>
        </div>
        <div className="w-full hidden"></div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const items = await getItems();

  // Get the paths we want to pre-render based on posts
  const paths = items.resources.map(item => ({
    params: { item: item.public_id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const item = await getItem(params.item);
  if (item && item.context && item.context.custom && item.context.custom.date) {
    item.context.custom.formatted_date = dtf.format(new Date(item.context.custom.date));
  }

  // Pass post data to the page via props
  return { props: { item } };
}
