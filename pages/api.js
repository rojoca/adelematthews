import fetch from "node-fetch"

export async function getItems() {
  const response = await fetch(
    `https://${process.env.CLOUDINARY_KEY}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/rojoca/resources/image/tags/adelematthews?context=true&max_results=500`
  )
  return response.json()
}

export async function getItem(publicId) {
  const response = await fetch(
    `https://${process.env.CLOUDINARY_KEY}:${process.env.CLOUDINARY_SECRET}@api.cloudinary.com/v1_1/rojoca/resources/image/upload/${publicId}?context=true`
  )
  return response.json()
}
