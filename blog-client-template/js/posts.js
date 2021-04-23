window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    const posts = await response.json();
    console.log(posts);

    let postHTML = "";
    for (post of posts) {
      let dateObj = new Date(post.date);

      postHTML += `<div class="blog_post">
      <div class="container_copy">
        <h1>${post.title}</h1>
        <p>
          ${post.content}
        </p>
      </div>
        <div class="time">
          <a class="btn_primary" href="#">Read More</a>
            <div class="date">
              <h3>Author: ${post.author}</h3>
              <h3>${formatDate(dateObj)}</h3>
          </div>
        </div>
      </div>`;

      document.querySelector(".wrapper").innerHTML = postHTML;
    }
  } catch (error) {
    console.log(error);
  }
}

function formatDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
