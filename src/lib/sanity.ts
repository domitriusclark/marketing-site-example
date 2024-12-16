import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const sanityClient = createClient({
  projectId: "t8gds5es",
  dataset: "production",
  useCdn: true,
});

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return imageBuilder.image(source);
}

export async function getHomePage() {
  const query = `*[_type == "home"][0]{
    title,
    description,
    heroImage,
    features[]{ title, description, icon }
  }`;
  return await sanityClient.fetch(query);
}

export async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->{ name, image }
  }`;
  return await sanityClient.fetch(query);
}

export async function getAllSlugs() {
  const query = `*[_type == "post"] { slug }`;
  return await sanityClient.fetch(query);
}

export async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    body,
    publishedAt,
    mainImage,
    "author": author->{ name, image }
  }`;
  return await sanityClient.fetch(query, { slug });
}
