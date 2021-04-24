window.onload = function () {
  fillForm();
  updatePost();
};

async function fillForm() {
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");

  try {
    const resp = await fetch("http://localhost:5000/posts/" + postId);
    const post = await resp.json();
    console.log(post);

    document.getElementById("updateAuthor").value = post.author;
    document.getElementById("updateContent").value = post.content;
    document.getElementById("updateTitle").value = post.title;
  } catch (error) {
    console.log(error);
  }
}

function updatePost() {
  let updatePost = document.getElementById("updatePost");

  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");

  updatePost.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log(e.target);
    let formData = {
      content: document.getElementById("updateContent").value,
      title: document.getElementById("updateTitle").value,
      author: document.getElementById("updateAuthor").value,
    };

    let myJson = JSON.stringify(formData);

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
