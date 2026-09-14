import type { PublishedPost } from "./api";

/**
 * The date a visitor should see on a post: when it went live, falling back to
 * when it was written for anything published before that stamp existed.
 */
export function postDate(
  post: Pick<PublishedPost, "publishedAt" | "createdAt">
): string {
  return new Date(post.publishedAt || post.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
