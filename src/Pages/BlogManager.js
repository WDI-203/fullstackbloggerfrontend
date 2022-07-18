import { useState } from "react";
import BlogManagerCard from "../Components/BlogManagerCard";
import Modal from "../Components/Modal";

const BlogManager = (props) => {
  const { adminBlogList, deleteBlog, fetchSingleBlog, urlEndpoint, setAdminBlogsLoading } = props;
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(null);
  const [editAuthor, setEditAuthor] = useState(null);
  const [editText, setEditText] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);

  const putUpdatedBlog = async () => {
    setAdminBlogsLoading(true)
    const url = `${urlEndpoint}/admin/edit-blog`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: editBlogId,
        title: editTitle,
        author: editAuthor,
        text: editText,
      }),
    });
    const responseJSON = await response.json();
    setAdminBlogsLoading(false)
    return responseJSON;
  };

  return (
    <div>
      <Modal
        title={editTitle}
        onClose={() => setShowModal(false)}
        show={showModal}
        putUpdatedBlog={putUpdatedBlog}
      >
        <label>Title</label>
        &nbsp;
        <input
          type="text"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
        />
        <br />
        <label>Author</label>
        &nbsp;
        <input
          type="text"
          value={editAuthor}
          onChange={(e) => {
            setEditAuthor(e.target.value);
          }}
        />
        <br />
        <label>Text</label>
        &nbsp;
        <textarea
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
          }}
        />
      </Modal>
      <h1>Blog Manager Page</h1>
      {adminBlogList.map((blog, idx) => {
        const fetchBlogAndShow = async () => {
          const blogPost = await fetchSingleBlog(blog.id);
          setEditTitle(blogPost.title);
          setEditAuthor(blogPost.author);
          setEditText(blogPost.text);
          setEditBlogId(blog.id);
          setShowModal(true);
        };

        return (
          <BlogManagerCard
            key={idx}
            blog={blog}
            deleteBlog={deleteBlog}
            fetchBlogAndShow={fetchBlogAndShow}
          />
        );
      })}
    </div>
  );
};

export default BlogManager;
