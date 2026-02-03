import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify"; 


const BLOG_DIR = path.join(process.cwd(), "blogs");

export interface BlogPost {
  slug: string;
  title: string;
  listTitle?: string;
  description?: string;
  listDescription?: string;
  date: string;
  tags?: string[];
  published?: boolean;
  content: string; // raw markdown
  contentHtml: string; // rendered HTML
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  listTitle?: string;
  description?: string;
  listDescription?: string;
  date: string;
  tags?: string[];
}

function validateFormatter(data : Record<string ,unknown>,
slug : string

) :void{
  const errors: string[] = [];
  const warnings: string[] = [];

  if(!data.title || typeof data.title !== "string"){
     errors.push(`Missing or invalid 'title' field`);
  }
  
  if (!data.date) {
    errors.push(`Missing 'date' field`);
  } else {
    const dateValue = new Date(data.date as string);
    if (isNaN(dateValue.getTime())) {
      errors.push(`Invalid date format: ${data.date}`);
    }
}
  if (!data.description) {
    warnings.push(`Missing 'description' field (recommended for SEO)`);
  }
    // Log warnings
  warnings.forEach((warning) => {
    console.warn(`[blogs/${slug}.md] Warning: ${warning}`);
  });

   if (errors.length > 0) {
    throw new Error(
      `[blogs/${slug}.md] Validation failed:\n  - ${errors.join("\n  - ")}`
    );
  }
}

export function getAllSlug() : string[]{
  if(!fs.existsSync(BLOG_DIR)){
    console.warn(`blog directory not found ${BLOG_DIR}`);
    return [];
  
  }
   const filenames = fs.readdirSync(BLOG_DIR)
   const slugs  = filenames
   .filter((filename : string)=> filename.endsWith(".md") || filename.endsWith(".mdx"))
   .map((filename)=>filename.replace(/\.mdx?$/,""));

   const seen = new Set<string>
   for(const slug of slugs){
    if(seen.has(slug)){
        throw new Error(`duplicate slug detected ${slug}`)
    }
    seen.add(slug)
   }

   return slugs
}

async function markdownToHTML(markdown:string) : Promise<string> {
    const result = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown)


    return result.toString();
}

export async function getPostBySlug(slug:string) : Promise<BlogPost | null> {
    let fullpath = path.join(BLOG_DIR , `${slug}.md`)
    if(!fs.existsSync(fullpath)){
        fullpath = path.join(BLOG_DIR, `${slug}.mdx`);
        if(!fs.existsSync(fullpath)) {
            return null
        }
    }
    const filecontent = fs.readFileSync(fullpath , "utf8");
    const {data , content} = matter(filecontent)
    const contentHtml = await markdownToHTML(content);

    validateFormatter(data, slug);

    return {
    slug,
    title: data.title as string,
    listTitle: data.listTitle as string | undefined,
    description: data.description as string | undefined,
    listDescription: data.listDescription as string | undefined,
    date: data.date as string,
    tags: data.tags as string[] | undefined,
    published: data.published !== false, // default to true
    content,
    contentHtml,
  };
}

export async function getallpost() : Promise<BlogPost []> {
    const slugs = getAllSlug();
    const posts : BlogPost[] = []; 
    
    for(const slug of slugs){
        const post = await getPostBySlug(slug);
        if(post && post.published !== false){
            posts.push(post);
        }
    }

    posts.sort((a ,b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateB.getTime() - dateA.getTime();
    });

    return posts;

}

export async function getallpostMeta() : Promise<BlogPostMeta[]> {
    const posts = await getallpost();

    return posts.map(({ slug, title, listTitle, description, listDescription, date, tags }) => ({
    slug,
    title,
    listTitle,
    description,
    listDescription,
    date,
    tags,
  }));
}
