// Twitter's image file convention is independent of opengraph-image's —
// Next.js doesn't automatically reuse one for the other, so both files
// are needed to guarantee og:image and twitter:image are both populated.
export { alt, contentType, default, size } from "./opengraph-image";
