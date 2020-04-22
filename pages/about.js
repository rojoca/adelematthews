import Head from "next/head"
import React from "react"
import { Image, Transformation } from "cloudinary-react"

export default function About(props) {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Adele Matthews - About</title>
        <meta property="og:url" content="https://adelematthews.nz/about" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Adele Matthews - About" />
        <meta
          property="og:description"
          content="Welcome. I am a New Zealand artist working in Wellington."
        />
        <meta
          property="og:image"
          content={`https://res.cloudinary.com/rojoca/image/upload/w_300,ar_1/foreign-tendencies`}
        />
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <h1 className="w-full font-body uppercase text-2xl text-gray-500 mb-4">About</h1>
      <div className="md:flex md:flex-row items-start">
        <figure className="float-left md:block w-1/2 pr-4 pb-4 md:pr-8 md:pb-8">
          <Image cloudName="rojoca" publicId="foreign-tendencies">
            <Transformation aspectRatio="1" crop="crop" />
          </Image>
        </figure>
        <div className="max-w-lg text-gray-600">
          <p className="text-sm mb-2 md:mb-4">
            <span className="font-bold">Pattern and colour</span> in the natural world fascinate me.
            The relationships formed between landscape and bush contrast and complement each other.
            As you journey through the landscape it unfolds. Our own stories are woven into the
            fabric of the landscape. Your threads, and mine are linked inextricably to others. We
            are a partnership with the land.
          </p>

          <p className="text-sm mb-2 md:mb-4">
            I have a fascination for pattern and colour in the natural world. From my basis as a
            weaver, I see the relationships formed between landscape and bush, contrasting and
            complimenting each other. As I journey through the landscape it unfolds, literally, as
            you turn a bend or crest a hill. This forms the basis of my paintings.
          </p>

          <p className="text-sm mb-2 md:mb-4">
            <span className="font-bold">Landscape</span> has a spiritual significance. Landscape
            should evoke memories, there are stories to be told: there is an emotional bond between
            the land and its inhabitants.
          </p>
        </div>
      </div>

      <div className="md:flex md:flex-row items-start">
        <figure className="float-left md:block w-1/2 pr-4 pb-4 md:pr-8 md:pb-8">
          <Image cloudName="rojoca" publicId="coaster-5">
            <Transformation aspectRatio="1" crop="crop" />
          </Image>
        </figure>
        <div className="max-w-lg text-gray-600">
          <p className="text-sm mb-2 md:mb-4">
            <span className="font-bold">Adele Matthews</span> has had a significant involvement in
            the arts as an artist, businesswoman, and highly respected teacher with a career
            spanning 40 years. Building on her formal art training from the Royal Melbourne
            Institute of Technology, Adele has produced a prolific catalogue of works in ceramics,
            weaving, fashion design and painting.
          </p>

          <p className="text-sm mb-2 md:mb-4">
            Adele’s work is richly layered and sumptuous. Sophisticated surfaces invite the viewer
            to look closely into the work and beyond to what lies, tantalizingly, just beyond our
            reach.
          </p>
        </div>
      </div>
    </div>
  )
}
