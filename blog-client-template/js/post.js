window.onload = function () {
  loadPost();
};

async function loadPost() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get("id");

  try {
    const response = await fetch("http://localhost:5000/posts/" + postId);
    const post = await response.json();
    console.log(post);
    let dateObj = new Date(post.date);
    let onePostHTML = "";

    onePostHTML += `<div class="blog_post">
    
    <div class="container_copy">
        <h1>${post.title}</h1>
            <p>
                 ${post.content}
            </p>
    </div>
  <div class="time">
    <a class="btn_back" href="index.html">BACK</a>
      <div class="date">
        <h3>Author: ${post.author}</h3>
        <h3>${formatDate(dateObj)}</h3>
    </div>
  </div>
</div>`;
    document.querySelector(".wrapper").innerHTML = onePostHTML;
  } catch (error) {
    console.log(error);
  }
}

function formatDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
