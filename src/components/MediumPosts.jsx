import { useEffect, useState } from "react";
import "./MediumPosts.css";

export default function MediumPosts({ title, cta, href }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/medium")
      .then((res) => (res.ok ? res.json() : { posts: [] }))
      .catch(() => ({ posts: [] }))
      .then((data) => {
        if (!cancelled) setPosts(data.posts ?? []);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <article className="medium-posts">
      <h3 className="media-item__title">{title}</h3>

      {posts && posts.length === 0 ? (
        <a className="media-link__anchor" href={href} target="_blank" rel="noopener noreferrer">
          {cta} &#8599;
        </a>
      ) : (
        <ul className="medium-posts__grid">
          {(posts ?? Array.from({ length: 6 }, () => null)).map((post, i) => (
            <li key={post?.url ?? i}>
              {post ? (
                <a
                  className="medium-posts__card"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="medium-posts__thumb">
                    {post.image ? <img src={post.image} alt="" loading="lazy" /> : null}
                  </div>
                  <span className="medium-posts__title">{post.title}</span>
                </a>
              ) : (
                <div className="medium-posts__card">
                  <div className="medium-posts__thumb" />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
