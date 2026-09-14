import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { categories } from "../data/site";
import {
  fetchPublishedPost,
  PostNotFoundError,
  type PublishedPost,
} from "../lib/api";
import { postDate } from "../lib/format";
import "./Posts.css";

type Outcome =
  | { kind: "ready"; post: PublishedPost }
  | { kind: "missing" }
  | { kind: "error"; message: string };

/** A completed fetch, tagged with the slug it was for — see the note in Posts.tsx. */
type Result = Outcome & { slug: string | undefined };

export default function PostDetail() {
  const { slug } = useParams();
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!slug) return;

    const controller = new AbortController();

    fetchPublishedPost(slug, controller.signal)
      .then((post) => setResult({ slug, kind: "ready", post }))
      .catch((error) => {
        if (controller.signal.aborted) return;
        if (error instanceof PostNotFoundError) {
          setResult({ slug, kind: "missing" });
          return;
        }
        setResult({
          slug,
          kind: "error",
          message:
            error instanceof Error ? error.message : "This post could not be loaded.",
        });
      });

    return () => controller.abort();
  }, [slug]);

  // A route with no slug can never resolve, so it reads as missing immediately
  // rather than sitting on a skeleton forever.
  const state: Outcome | { kind: "loading" } = !slug
    ? { kind: "missing" }
    : !result || result.slug !== slug
      ? { kind: "loading" }
      : result;

  if (state.kind === "loading") {
    return (
      <>
        <PageHero title="Loading post…" />
        <section className="section">
          <div className="container post-article" aria-hidden="true">
            <span className="post-skeleton post-skeleton--title" />
            <span className="post-skeleton" />
            <span className="post-skeleton" />
            <span className="post-skeleton post-skeleton--short" />
          </div>
        </section>
      </>
    );
  }

  if (state.kind === "missing" || state.kind === "error") {
    const isMissing = state.kind === "missing";
    return (
      <>
        <PageHero title={isMissing ? "Post not found" : "Post unavailable"} />
        <section className="section">
          <div className="container">
            <div className="post-empty">
              <h2 className="post-empty__title">
                {isMissing ? "This post is no longer available" : "Something went wrong"}
              </h2>
              <p>
                {isMissing
                  ? "The article you are looking for may have been removed or is not yet published."
                  : state.message}
              </p>
              <Link to="/post" className="btn btn--outline">
                Back to Posts
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const { post } = state;
  const category = categories.find((entry) => entry.slug === post.category);

  return (
    <>
      <PageHero title={post.title} />

      <article className="section">
        <div className="container post-article">
          <p className="post-article__meta">
            {postDate(post)}
            {category && (
              <>
                {" · "}
                <Link to={`/category/${category.slug}`}>{category.label}</Link>
              </>
            )}
            {post.author?.name && ` · ${post.author.name}`}
          </p>

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt=""
              className="post-article__cover"
              loading="lazy"
            />
          )}

          {/* Stored as plain text, so paragraph breaks are the author's blank lines.
              Rendering it as text rather than HTML keeps the public page safe from
              whatever an author pastes in. */}
          <div className="post-article__body">
            {post.body
              ?.split(/\n{2,}/)
              .map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>

          <Link to="/post" className="btn btn--outline post-article__back">
            Back to Posts
          </Link>
        </div>
      </article>
    </>
  );
}
