import React from "react";

export default function Contact(props) {
  return (
    <div className="md:flex md:flex-row items-start">
      <img
        src="http://res.cloudinary.com/rojoca/image/upload/ar_1,c_crop/foreign-tendencies"
        className="float-left md:block w-1/2 pr-4 pb-4 md:pr-8 md:pb-8"
      />
      <div className="max-w-lg text-gray-600">
        <h1 className="font-titles text-2xl mb-2 md:mb-4 font-bolder">About</h1>
        <p className="text-sm mb-2 md:mb-4">
          Pattern and colour in the natural world fascinate me. The
          relationships formed between landscape and bush contrast and
          complement each other. As you journey through the landscape it
          unfolds. Our own stories are woven into the fabric of the landscape.
          Your threads, and mine are linked inextricably to others. We are a
          partnership with the land.
        </p>

        <p className="text-sm mb-2 md:mb-4">
          I have a fascination for pattern and colour in the natural world. From
          my basis as a weaver, I see the relationships formed between landscape
          and bush, contrasting and complimenting each other. As I journey
          through the landscape it unfolds, literally, as you turn a bend or
          crest a hill. This forms the basis of my paintings.
        </p>

        <p className="text-sm mb-2 md:mb-4">
          Landscape has a spiritual significance. Landscape should evoke
          memories, there are stories to be told: there is an emotional bond
          between the land and its inhabitants.
        </p>

        <p className="text-sm mb-2 md:mb-4">
          Adele Matthews has had a significant involvement in the arts as an
          artist, businesswoman, and highly respected teacher with a career
          spanning 40 years. Building on her formal art training from the Royal
          Melbourne Institute of Technology, Adele has produced a prolific
          catalogue of works in ceramics, weaving, fashion design and painting.
        </p>

        <p className="text-sm mb-2 md:mb-4">
          Adele’s work is richly layered and sumptuous. Sophisticated surfaces
          invite the viewer to look closely into the work and beyond to what
          lies, tantalizingly, just beyond our reach.
        </p>
      </div>
    </div>
  );
}
