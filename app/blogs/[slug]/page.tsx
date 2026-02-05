import { getPostBySlug, getAllSlug } from "@/lib/blog";
import { PROSE_STYLES } from "@/lib/styles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

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
        return constructMetadata({
            title: "Post Not Found",
            noIndex: true,
        });
    }

    return constructMetadata({
        title: `${post.title} | Dushyant Singh`,
        description: post.description,
        image: `https://dushyantsingh.com/api/og?title=${encodeURIComponent(post.title)}`, // Example dynamic OG
    });
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
        <article className="min-h-screen px-5 py-10 selection:bg-orange-600 selection:text-black md:px-10 lg:px-20">
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
                    <div className="mb-4 flex w-full items-center justify-between">
                        <span className="block font-mono text-sm font-bold uppercase tracking-wider text-orange-600">
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
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-white md:text-5xl lg:text-6xl">
                        {post.title}
                    </h1>
                </div>
            </header>

            <main className="mx-auto max-w-3xl ">
                <div
                    className={PROSE_STYLES}
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
                {/* The Blur Overlay */}
                {/* The Subtle Blur Overlay */}
                <div
                    className="pointer-events-none fixed bottom-0 left-0 w-full h-24 z-50"
                    style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)'
                    }}
                />
            </main>

            <footer className="mx-auto max-w-3xl mt-20 border-t border-zinc-800 pt-10">
                <div className="flex justify-between items-center text-zinc-500 font-mono text-sm">
                    <span>
                        Dushyant singh //{" "}
                        {new Date().toLocaleString("en-US", {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        })}
                    </span>
                    <Link
                        href="/"
                        className="hover:text-white transition-colors font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-300 md:text-sm md:font-mono md:tracking-wider md:font-bold md:text-zinc-400 md:hover:text-zinc-300 md:hover:text-white "
                    >
                        Home
                    </Link>
                </div>
            </footer>
        </article>
    );
}

