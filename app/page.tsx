import { getallpostMeta } from "@/lib/blog";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

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
    <div className="flex min-h-screen flex-col px-5 py-10 selection:bg-orange-600 selection:text-white md:px-10 lg:px-20">

      <div className="mx-auto w-full max-w-5xl">
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

        <div className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-4">
          <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-200">
            Recent Blogs
          </h2>
          <span className="font-mono text-xs text-zinc-600">
            {recentPosts.length} / {posts.length} POSTS
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
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
            className="group flex items-center gap-2 border border-zinc-700 px-8 py-3 text-sm font-bold uppercase tracking-widest text-zinc-300 transition-all hover:border-orange-600  hover:text-orange-600 transition-colors duration-300 ease-in-out"
          >
            Show More
          </Link>
        </div>
      </div>
    </div>
  );
}

