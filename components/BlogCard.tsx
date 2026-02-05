import Link from "next/link";
import { BlogPostMeta } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
    return (
        <Link
            href={`/blogs/${post.slug}`}
            className="group relative block w-full border border-zinc-800 bg-black p-4 transition-all duration-300 hover:border-orange-600/50 md:p-5"
        >
            <div className="flex flex-col pr-12">
                <div className="mb-2 flex w-full items-center justify-between">
                    <span className="font-mono text-[14px] font-bold leading-[22.75px] text-orange-600 uppercase tracking-wider transition-colors group-hover:text-orange-500">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="font-mono text-[12px] font-bold uppercase text-orange-600"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <h3 className="mb-2 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-orange-500 md:text-3xl">
                    {post.listTitle || post.title}
                </h3>
                {(post.listDescription || post.description) && (
                    <p className="max-w-3xl font-mono text-[14px] font-normal leading-[20px] text-[lab(53.6_0_0)] transition-colors group-hover:text-zinc-400">
                        {post.listDescription || post.description}
                    </p>
                )}
            </div>

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
    );
}
