import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { categories } from "../data/site";
import { fetchPublishedPosts, type PublishedPost } from "../lib/api";
import { postDate } from "../lib/format";
import "./Posts.css";

/**
 * What the last completed fetch returned, tagged with the category it was for.
 *
 * Keeping the slug in here is what lets "loading" be derived rather than set at
 * the top of the effect: a result for a different category is by definition
 * stale, so switching tabs shows the skeleton without a synchronous setState.
 */
type Result = {
  slug: string | undefined;
  posts: PublishedPost[];
  failed: boolean;
};

export default function Posts() {
  const { slug } = useParams();
  const category = categories.find((entry) => entry.slug === slug);

  const [result, setResult] = useState<Result | null>(null);

  const status = !result || result.slug !== slug
    ? "loading"
    : result.failed
      ? "error"
      : "ready";
  const posts = status === "ready" && result ? result.posts : [];

  useEffect(() => {
    const controller = new AbortController();

    fetchPublishedPosts(slug, controller.signal)
      .then((loaded) => setResult({ slug, posts: loaded, failed: false }))
      .catch(() => {
        if (controller.signal.aborted) return;
        setResult({ slug, posts: [], failed: true });
      });

    return () => controller.abort();
  }, [slug]);

  return (
    <>
      <PageHero title={category ? category.label : "Post"} />

      <section className="section">
        <div className="container">
          <nav className="post-filters" aria-label="Post categories">
            <NavLink
              to="/post"
              end
              className={({ isActive }) =>
                `post-filters__link ${isActive ? "is-active" : ""}`
              }
            >
              All
            </NavLink>
            {categories.map((entry) => (
              <NavLink
                key={entry.slug}
                to={`/category/${entry.slug}`}
                className={({ isActive }) =>
                  `post-filters__link ${isActive ? "is-active" : ""}`
                }
              >
                {entry.label}
              </NavLink>
            ))}
          </nav>

          {status === "loading" && (
            <ul className="post-list" aria-hidden="true">
              {[0, 1, 2].map((index) => (
                <li key={index} className="post-card post-card--skeleton">
                  <span className="post-skeleton post-skeleton--meta" />
                  <span className="post-skeleton post-skeleton--title" />
                  <span className="post-skeleton" />
                  <span className="post-skeleton post-skeleton--short" />
                </li>
              ))}
            </ul>
          )}

          {status === "error" && (
            <div className="post-empty">
              <h2 className="post-empty__title">Posts could not be loaded</h2>
              <p>
                Something went wrong reaching our publishing service. Please refresh
                the page, or get in touch if the problem continues.
              </p>
              <Link to="/contact" className="btn btn--outline">
                Contact Us
              </Link>
            </div>
          )}

          {status === "ready" && posts.length === 0 && (
            <div className="post-empty">
              <h2 className="post-empty__title">No posts published yet</h2>
              <p>
                GRC news, gemology articles, and laboratory updates will be published
                here. Please check back soon.
              </p>
              <Link to="/contact" className="btn btn--outline">
                Contact Us
              </Link>
            </div>
          )}

          {status === "ready" && posts.length > 0 && (
            <ul className="post-list">
              {posts.map((post) => (
                <li key={post._id} className="post-card">
                  <Link to={`/post/${post.slug}`} className="post-card__link">
                    {post.coverImage && (
                      <img
                        src={post.coverImage}
                        alt=""
                        className="post-card__image"
                        loading="lazy"
                      />
                    )}
                    <p className="post-card__meta">{postDate(post)}</p>
                    <h2 className="post-card__title">{post.title}</h2>
                    <p className="post-card__excerpt">{post.excerpt}</p>
                    <span className="post-card__more" aria-hidden="true">
                      Read more
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
