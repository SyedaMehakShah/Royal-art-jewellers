// import { type SchemaTypeDefinition } from 'sanity'

// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [],
// }
import product from "./product"
import collection from "./collection"
import banner from "./banner"
import cart from "./cart"
import wishlist from "./wishlist"
import review from "./review"
import order from "./order"
import newsletterSubscriber from "./newsletterSubscriber"

export const schema = {
  types: [product, collection, banner, cart, wishlist, review, order, newsletterSubscriber],
}

