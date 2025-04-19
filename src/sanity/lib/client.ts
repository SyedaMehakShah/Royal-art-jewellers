import { createClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(client);

export function urlFor(source: { _type: string; asset: { _ref: string } }) {
  return builder.image(source);
}
