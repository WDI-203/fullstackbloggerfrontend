import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import BlogsPage from "./Pages/BlogsPage";
import PostBlogPage from "./Pages/PostBlogPage";
import BlogManager from "./Pages/BlogManager";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState({ message: "" });
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [adminBlogList, setAdminBlogList] = useState([]);
  const [adminBlogsLoading, setAdminBlogsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [
    sortField,
    sortOrder,
    filterField,
    filterValue,
    limit,
    page,
    blogsLoading,
  ]);

  useEffect(() => {
    const fetchAdminBlogList = async () => {
      const apiResponse = await fetch(`${urlEndpoint}/admin/blog-list`);
      const json = await apiResponse.json();
      setAdminBlogList(json.message);
      return json;
    };
    fetchAdminBlogList();
  }, [adminBlogsLoading]);

  const blogSubmit = async (blog) => {
    setBlogsLoading(true);
    const url = `${urlEndpoint}/blogs/blog-submit`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    const responseJSON = await response.json();
    setBlogsLoading(false);
  };

  const deleteBlog = async (blogId) => {
    setAdminBlogsLoading(true);
    const url = `${urlEndpoint}/admin/delete-blog/${blogId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    const responseJSON = await response.json();
    setAdminBlogsLoading(false);
  };

  const fetchSingleBlog = async (blogId) => {
    const url = `${urlEndpoint}/blogs/single-blog/${blogId}`
    const response = await fetch(url);
    const responseJSON = await response.json();
    return responseJSON
  }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            index
            element={
              <BlogsPage
                message={serverJSON.message}
                sortField={sortField}
                setSortField={setSortField}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                filterField={filterField}
                setFilterField={setFilterField}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                limit={limit}
                setLimit={setLimit}
                page={page}
                setPage={setPage}
              />
            }
          />
          <Route
            path="/post-blog"
            element={<PostBlogPage blogSubmit={blogSubmit} />}
          />
          <Route
            path="/blog-manager"
            element={
              <BlogManager
                adminBlogList={adminBlogList}
                deleteBlog={deleteBlog}
                fetchSingleBlog={fetchSingleBlog}
                urlEndpoint={urlEndpoint}
                setAdminBlogsLoading={setAdminBlogsLoading}
              />
            }
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
