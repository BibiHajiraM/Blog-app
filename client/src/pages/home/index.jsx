import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    const response = await axios.get("http://localhost:4000/api/blogs");

    const result = await response.data;

    if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(getCurrentId) {
    const response = await axios.delete(
      `http://localhost:4000/api/blogs/delete/${getCurrentId}`
    );

    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
      //navigate(0);
    }
  }

  function handleEdit(getCurrentBlogItem) {
    console.log(getCurrentBlogItem);
    navigate("/add-blog", { state: { getCurrentBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog list</h1>
      {pending ? (
        <h1>Loading...</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList && blogList.length ? (
            blogList.map((item) => (
              <div key={item._id}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <FaEdit onClick={() => handleEdit(item)} size={30} />
                <FaTrash onClick={() => handleDeleteBlog(item._id)} size={30} />
              </div>
            ))
          ) : (
            <h3>No blogs added</h3>
          )}
        </div>
      )}
    </div>
  );
}
