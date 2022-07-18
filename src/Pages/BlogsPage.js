const sortFieldOptions = ["", "title", "author", "createdAt"];
const sortOrderOptions = ["ASC", "DESC"];
const filterFieldOptions = ["", "title", "author"];

const BlogsPage = (props) => {
  const {
    message,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    filterField,
    setFilterField,
    filterValue,
    setFilterValue,
    limit,
    setLimit,
    page,
    setPage,
  } = props;
  return (
    <div className="blogs-page">
      <h1>Blogs Page</h1>
      <label>sortField</label>
      <select
        defaultValue={sortField}
        onChange={(e) => {
          setSortField(e.target.value);
        }}
      >
        {sortFieldOptions.map((optionName, idx) => {
          return <option value={optionName} key={idx}>{optionName}</option>;
        })}
      </select>
      <label>sortOrder</label>
      <select
        onChange={(e) => {
          setSortOrder(e.target.value);
        }}
        defaultValue={sortOrder}
      >
        {sortOrderOptions.map((optionName, idx) => {
          return <option value={optionName} key={idx}>{optionName}</option>;
        })}
      </select>
      <br/>
      <label>filterField</label>
      <select
        defaultValue={filterField}
        onChange={(e) => {
          setFilterField(e.target.value);
        }}
      >
        {filterFieldOptions.map((optionName, idx) => {
          return <option value={optionName} key={idx}>{optionName}</option>;
        })}
      </select>
      <label>filterValue</label>
      <input
        value={filterValue}
        type="text"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
      />
      <br/>
      <label>Limit</label>
      <input
        value={limit}
        type="number"
        onChange={(e) => {
          const value = e.target.value;
          setLimit(Number(value));
        }}
      />
      <label>Page</label>
      <input
        value={page}
        type="number"
        onChange={(e) => {
          const value = e.target.value;
          setPage(Number(value));
        }}
      />
      <p>
        <h3>Blogs</h3>
        {message && message.map((blog, idx) => {
          return <div key={idx}>{blog.title}</div>;
        })}
      </p>
    </div>
  );
};

export default BlogsPage;
