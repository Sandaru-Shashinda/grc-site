import { Link, NavLink, useParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import { categories, posts } from "../data/site";
import "./Posts.css";

export default function Posts() {
  const { slug } = useParams();
  const category = categories.find((entry) => entry.slug === slug);
  const visiblePosts = slug
    ? posts.filter((post) => post.category === slug)
    : posts;

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

          {visiblePosts.length === 0 ? (
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
          ) : (
            <ul className="post-list">
              {visiblePosts.map((post) => (
                <li key={post.slug} className="post-card">
                  <p className="post-card__meta">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="post-card__title">{post.title}</h2>
                  <p>{post.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
