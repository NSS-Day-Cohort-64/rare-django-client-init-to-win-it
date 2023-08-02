import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { getAllTags } from "../../managers/TagManager"

export const TagList = () => {

  const [tags, setTags] = useState([])
  const navigate = useNavigate()

  useEffect(
    () => {
      getAllTags().then((tagData) => setTags(tagData))
    },
    []
  )

  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>
            {tag.label}
            <Link to={`/tags/${tag.id}/edit`}>Edit</Link>{" "}
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}