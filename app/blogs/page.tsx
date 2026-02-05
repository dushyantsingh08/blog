import { getallpostMeta } from "@/lib/blog";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";

export const metadata = {
    title: "Blogs | dushyant singh",
    description: "All my writings and thoughts",
};

export default async function BlogList() {
    const posts = await getallpostMeta();

    return (
        <div className="flex min-h-screen flex-col px-5 py-10 selection:bg-orange-600 selection:text-white md:px-10 lg:px-20">
            {/* SHARED CONTAINER */}
            <div className="mx-auto w-full max-w-5xl">
                {/* HEADER */}
                <header className="mb-20 border-l-2 border-orange-600 pl-6">
                    <div className="mb-4 flex items-center gap-4">
                        <Link
                            href="/"
                            className="text-zinc-500 transition-colors hover:text-orange-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                />
                            </svg>
                        </Link>

                        <h1 className="text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl">
                            All <span className="text-orange-600">Writings</span>
                        </h1>
                    </div>

                    <p className="max-w-2xl font-mono text-lg text-zinc-500 md:text-xl">
            // ARCHIVE OF THOUGHTS
                    </p>
                </header>

                {/* MAIN */}
                <main>
                    <div className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-4">
                        <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-400">
                            Posts
                        </h2>
                        <span className="font-mono text-xs text-zinc-600">
                            {posts.length} POSTS
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {posts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}

                        {posts.length === 0 && (
                            <div className="py-20 text-center font-mono text-zinc-600">
                                No posts found.
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
