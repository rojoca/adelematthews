import React from "react";
import Item from "../components/Item";

export default function Home({ items }) {
  return (
    <div class="flex flex-col">
      <div>
        <p>
          Welcome. I am a New Zealand artist working out of my studio at Sacred
          Heart Girls’ College Hamilton.
        </p>
        <p>
          This website aims to make my art available to anyone interested in art
          of a New Zealand nature and character.
        </p>
      </div>

      <div class="flex flex-row">
        {items.map(item => (
          <Item item={item} key={item.src} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const items = [
    {
      src:
        "https://static1.squarespace.com/static/5aeb759350a54f5fd2b23750/5b3305ea0e2e72c0a5afe9cf/5b5ad8a0758d46b11c9b4f9f/1532680469833/Foreign-Tendencies.jpg",
      name: "Foreign Tendencies"
    },
    {
      src:
        "https://images.squarespace-cdn.com/content/v1/5aeb759350a54f5fd2b23750/1532680308212-Q7CZG27NCYHIGG77SD22/ke17ZwdGBToddI8pDm48kEfrN2uVfu4wi26-UFswDj97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ua7vDm09-jdRtdl1qltXzQCAHJVeZBphrAZNspfN1ua8BltQNugx0IX_zMvsek3f7g/coaster-5.jpg",
      name: "The Forest Floor"
    }
  ];
  return {
    props: { items } // will be passed to the page component as props
  };
}
