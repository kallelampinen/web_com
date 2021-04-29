window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    const posts = await response.json();
    posts;

    let postHTML = "";
    for (post of posts) {
      let dateObj = new Date(post.date);
      
      let str = post.content;
      let tags = post.tags;
      let splitTags = tags.join(", ");

      const length = 100;
      let trimmedString = str.substring(0, length);

      if (str.length > 100) {
        trimmedString = str.substring(0, length) + "...";
      } else {
        trimmedString = str.substring(0, length);
      }
      postHTML += `<div class="blog_post">
      <div class="container_copy">
        <h1>${post.title}</h1>
        <p id="hundra">
        ${trimmedString}
        </p>
      </div>
        <div class="time">
          <a class="btn_primary" href="post.html?id=${
            post["_id"]
          }">Read More</a>
            <h3 class="tags">Tags:${splitTags}</h3>
            <div class="date">
              <h3>Author: ${post.author}</h3>
              <h3 id="date">${formatDate(dateObj)}</h3>
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
  return `${dateObj.getFullYear()}- 0${
    dateObj.getMonth()+ 1
  }-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
