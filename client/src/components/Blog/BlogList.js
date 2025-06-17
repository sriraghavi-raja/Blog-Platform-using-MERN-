import BlogCard from './BlogCard';
import './BlogList.css';

const BlogList = ({ posts, isOwner = false, onDelete }) => {
  return (
    <div className="blog-list">
      {posts.length === 0 ? (
        <div className="no-posts">
          No blog posts found. {isOwner && 'Create your first post!'}
        </div>
      ) : (
        posts.map(post => (
          <BlogCard 
            key={post._id} 
            post={post} 
            isOwner={isOwner}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default BlogList;