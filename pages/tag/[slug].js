import Link from 'next/link'
import { getAllTags, getAllPostsByTagSlug, getTagBySlug } from '../../lib/ghost';
  
export async function getStaticPaths() {
  const tags = await getAllTags();
  const paths = tags.map(({ slug }) => ({ params: { slug } })); 
  return { paths, fallback: false };
}
  
export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await getAllPostsByTagSlug(slug);
  const tagData = await getTagBySlug(slug)
  return { props: { posts, tagData } };
}

export default function Tag({ posts, tagData }) {
  return (
	<div>
	  <h1>{tagData.name}</h1>
	  <p>A collection of {tagData.count.posts} posts</p>
	  <ul>
        {posts.map((post) => (
          <li key={post.uuid}>
            <Link href={`/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
	</div>
  )
}
