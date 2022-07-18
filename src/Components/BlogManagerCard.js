const BlogManagerCard = (props) => {
  const { blog, deleteBlog, fetchBlogAndShow } = props;
  const { id, title, author, createdAt, lastModified } = blog;
  const createdAtDate = new Date(createdAt);
  const createdAtString = createdAtDate.toDateString();
  const lastModifiedDate = new Date(lastModified);
  const lastModifiedString = lastModifiedDate.toDateString();
  return (
    <div className="blog-post">
      <span>
        <p>
          <strong>Id:</strong>
          &nbsp;
          {id}
        </p>
      </span>
      <span>
        <p>
          <strong>Title:</strong>
          &nbsp;
          {title}
        </p>
      </span>
      <span>
        <p>
          <strong>Author:</strong>
          &nbsp;
          {author}
        </p>
      </span>
      <span>
        <p>
          <strong>Created At:</strong>
          &nbsp;
          {createdAtString}
        </p>
      </span>
      <span>
        <p>
          <strong>Last Modified:</strong>
          &nbsp;
          {lastModifiedString}
        </p>
      </span>
      <button
        onClick={() => {
          deleteBlog(id);
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          fetchBlogAndShow();
        }}
      >
        Edit Blog
      </button>
    </div>
  );
};

export default BlogManagerCard;
