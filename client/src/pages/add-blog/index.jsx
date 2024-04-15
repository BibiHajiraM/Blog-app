import { useContext, useEffect } from "react";
import classes from "./styles.module.css";
import { GlobalContext } from "../../context";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddBlog() {
  const { formData, setFormData, isEdit, setIsEdit } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveBlogToDB() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:4000/api/blogs/update/${location.state.getCurrentBlogItem._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:4000/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;

    if (result) {
      setIsEdit(false);
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  }

  useEffect(() => {
    console.log(location);

    if (location.state) {
      const { getCurrentBlogItem } = location.state;
      setIsEdit(true);

      setFormData({
        title: getCurrentBlogItem.title,
        description: getCurrentBlogItem.description,
      });
    }
  }, [location]);

  return (
    <div className={classes.wrapper}>
      <h1>{isEdit ? "Edit blog" : "Add blog"}</h1>
      <div className={classes.formWrapper}>
        <input
          name="title"
          placeholder="Enter blog title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          name="description"
          placeholder="Enter blog description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({ ...formData, description: event.target.value })
          }
        />
        <button onClick={handleSaveBlogToDB}>
          {isEdit ? "Edit blog" : "Add blog"}
        </button>
      </div>
    </div>
  );
}
