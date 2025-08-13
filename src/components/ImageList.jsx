import { useEffect, useState } from "react";

function ImageList() {
  const [images, setImages] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    fetch("http://localhost:9999/api/images")
      .then((res) => res.json())
      .then(setImages);
  });

  const handleLike = (id) => {
    fetch(`http://localhost:9999/api/images/${id}/like`, { method: "POST" });

    fetch("http://localhost:9999/api/images")
      .then((res) => res.json())
      .then(setImages);
  };

  const handleComment = (id) => {
    const text = commentInputs[id];
    if (!text) return;
    fetch(`http://localhost:9999/api/images/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "Application/json" },
      body: JSON.stringify({ text }),
    });

    setCommentInputs({ ...commentInputs, [id]: "" });

    fetch("http://localhost:9999/api/images")
      .then((res) => res.json())
      .then(setImages);
  };

  return (
    <div>
      <h1>Gallery</h1>
      {images.map((i) => (
        <div key={i._id}>
          <img src={i.secure_url} alt={i.originalname} width={200} />
          <button onClick={() => handleLike(i._id)}>Like {i.likes}</button>
          Comments:
          <ul>
            {i.comments.map((cmt, idx) => (
              <li key={idx}>{cmt.text}</li>
            ))}
          </ul>
          <input
            type="text"
            value={commentInputs[i._id] || ""}
            onChange={(e) =>
              setCommentInputs({ ...commentInputs, [i._id]: e.target.value })
            }
            placeholder="What do you think?"
          />
          <button onClick={() => handleComment(i._id)}>Send</button>
        </div>
      ))}
    </div>
  );
}

export default ImageList;
