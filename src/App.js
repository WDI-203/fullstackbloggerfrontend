import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import "./App.css";
import BlogsPage from "./Pages/BlogsPage";
import PostBlogPage from "./Pages/PostBlogPage";

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


  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs?sortField=${sortField}&sortOrder=${sortOrder}&filterField=${filterField}&filterValue=${filterValue}&limit=${limit}&page=${page}`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [sortField, sortOrder, filterField, filterValue, limit, page, blogsLoading]);

  const blogSubmit = async (blog) => {
    setBlogsLoading(true)
    const url = `${urlEndpoint}/blogs/blog-submit`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog) 
    });
    const responseJSON = await response.json();
    setBlogsLoading(false)
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
            element={
              <PostBlogPage
                blogSubmit={blogSubmit}
              />
            }
          />
          {/* 
          <Route
            path="/blog-manager"
            element={
              <BlogManager
                adminBlogList={adminBlogList}
                deleteBlog={deleteBlog}
                fetchSingleBlog={fetchSingleBlog}
                urlEndpoint={urlEndpoint}
              />
            }
          /> */}
        </Routes>
      </header>
    </div>
  );
}

export default App;
