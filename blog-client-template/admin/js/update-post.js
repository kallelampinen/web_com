updatePosts();
updated();

async function updatePosts() {
  let url = new URLSearchParams(window.location.search);
  let postId = url.get("id");

  try {
    let request = await fetch("http://localhost:5000/posts/" + postId);

    let response = await request.json();
    console.log(response);

    document.getElementById("updateTitle").value = response.title;
    document.getElementById("updateAuthor").value = response.author;
    document.getElementById("updateContent").value = response.content;
    document.getElementById("tags").value = response.tags;
  } catch (error) {}
}

function updated() {
  let url = new URLSearchParams(window.location.search);
  let postId = url.get("id");

  let newPost = document.getElementById("submitBtn");
  newPost.addEventListener("click", async function (e) {
    e.preventDefault();

    let select = document.getElementById("tags");
    selected = [...select.selectedOptions].map((option) => option.value);
    console.log(selected);

    const blogData = {
      title: document.getElementById("updateTitle").value,
      content: document.getElementById("updateContent").value,
      author: document.getElementById("updateAuthor").value,
      tags: selected,
    };
    const myJson = JSON.stringify(blogData);
    try {
      await fetch("http://localhost:5000/posts/" + postId, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: myJson,
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.location.replace("/web_com/blog-client-template/index.html");
    }
  });
}
