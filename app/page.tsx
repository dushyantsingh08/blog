import { getallpostMeta } from "@/lib/blog";
import Link from "next/link";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, '.');
}

export default async function Home() {
  const posts = await getallpostMeta();
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="flex min-h-screen flex-col bg-black px-5 py-10 font-sans text-zinc-100 selection:bg-orange-500/30 md:px-10 lg:px-20">
      <header className="mb-20 border-l-2 border-orange-600 pl-6">
        <h1 className="mb-4 text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl">
          dushyant <span className="text-orange-600">singh</span>
        </h1>
        <p className="max-w-2xl font-mono text-lg text-zinc-500 md:text-xl">
          // FULLSTACK ENGINEER
          <br />
          // BUILDING STUFFS THAT MATTER
        </p>
      </header>

      <main className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400">
            Recent Writings
          </h2>
          <span className="font-mono text-xs text-zinc-600">
            {recentPosts.length} / {posts.length} POSTS
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group relative block w-full border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-orange-600/50 hover:bg-zinc-900 md:p-8"
            >
              <div className="flex flex-col pr-12">
                <span className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-orange-700 transition-colors group-hover:text-orange-500 md:text-sm">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <h3 className="mb-2 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-orange-500 md:text-3xl">
                  {post.listTitle || post.title}
                </h3>
                {(post.listDescription || post.description) && (
                  <p className="max-w-3xl text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-400 md:text-base">
                    {post.listDescription || post.description}
                  </p>
                )}
              </div>

              {/* Bottom Right "Read More" Area */}
              <div className="absolute bottom-6 right-6 flex items-center gap-2 text-zinc-600 transition-colors group-hover:text-orange-500">
                <span className="hidden text-[10px] font-bold uppercase tracking-widest md:inline-block">
                  Read
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
                >
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
          {recentPosts.length === 0 && (
            <div className="py-20 text-center text-zinc-600 font-mono">
              No posts found.
            </div>
          )}
        </div>

        <div className="mt-20 flex justify-center">
          <Link
            href="/blogs"
            className="group flex items-center gap-2 border border-zinc-700 px-8 py-3 text-sm font-bold uppercase tracking-widest text-zinc-300 transition-all hover:border-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Show More
          </Link>
        </div>
      </main>
    </div>
  );
}
