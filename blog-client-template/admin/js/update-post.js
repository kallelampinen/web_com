updatePosts();
updated();

async function updatePosts() {
  let url = new URLSearchParams(window.location.search);
  let postId = url.get("id");

  try {
    let request = await fetch("http://localhost:5000/posts/" + postId);

    let response = await request.json();

    document.getElementById("updateTitle").value = response.title;
    document.getElementById("updateAuthor").value = response.author;
    document.getElementById("updateContent").value = response.content;
    document.getElementById("tags").value = response.tags;
    document.getElementById("date").innerHTML = response.date;
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
    const blogData = {
      title: document.getElementById("updateTitle").value,
      content: document.getElementById("updateContent").value,
      author: document.getElementById("updateAuthor").value,
      tags: selected,
      date: formatDate(),
    };

    console.log(blogData);

    console.log(blogData.date);
    const myJson = JSON.stringify(blogData);
    console.log(myJson);
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

function formatDate() {
  return new Date();
}
