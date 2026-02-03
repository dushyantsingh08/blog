import { getPostBySlug, getAllSlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

// Force static generation for known slugs
export async function generateStaticParams() {
    const slugs = getAllSlug();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    return {
        title: `${post.title} |  Dushyant Singh `,
        description: post.description,
    };
}

export default async function BlogPost({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-black px-5 py-10 font-sans text-zinc-100 selection:bg-orange-500/30 md:px-10 lg:px-20">
            <header className="mx-auto max-w-3xl mb-12">
                <Link
                    href="/blogs"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-orange-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-4 w-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    Back to Blogs
                </Link>

                <div className="border-l-2 border-orange-600 pl-6">
                    <span className="mb-4 block font-mono text-sm font-bold uppercase tracking-wider text-orange-600">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </span>
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>
                </div>
            </header>

            <main className="mx-auto max-w-3xl">
                <div
                    className="prose prose-invert prose-lg prose-orange max-w-none 
          prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-white 
          prose-p:text-zinc-300 prose-p:leading-relaxed 
          prose-a:text-orange-500 prose-a:no-underline hover:prose-a:text-orange-400 
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-orange-300 prose-code:bg-zinc-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
          prose-blockquote:border-l-orange-600 prose-blockquote:bg-zinc-900/40 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:text-zinc-400 prose-blockquote:not-italic
          "
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
            </main>

            <footer className="mx-auto max-w-3xl mt-20 border-t border-zinc-800 pt-10">
                <div className="flex justify-between items-center text-zinc-500 font-mono text-sm">
                    <span>Dushyant singh // 2026</span>
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                </div>
            </footer>
        </article>
    );
}
