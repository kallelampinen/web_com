let newPost = document.getElementById("submitBtn");

newPost.addEventListener("click", async function (e) {
  e.preventDefault();

  let select = document.getElementById("tags");
  selected = [...select.selectedOptions].map((option) => option.value);
  

  const blogData = {
    title: document.getElementById("createTitle").value,
    content: document.getElementById("createContent").value,
    author: document.getElementById("createAuthor").value,
    tags: selected,
    
  };

  const myJson = JSON.stringify(blogData);
  try {
    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: myJson,
    });
  } catch (error) {
    console.log(error);
  } finally {
    window.location.replace("/web_com/blog-client-template/admin/index.html");
  }
});

function formatDate() {
  return new Date();
}
