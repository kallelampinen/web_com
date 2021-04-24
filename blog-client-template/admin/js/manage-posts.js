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

      console.log(post.author);

      postHTML += `
        <tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${formatDate(dateObj)}</td>
            <td>
            <a href="#" id="delete-btn" data-id="${post["_id"]}">Delete</a>
            <a href="/web_com/blog-client-template/admin/update-post.html?id=${
              post["_id"]
            }">Update</a>
        </td>
    </tr>
        `;

      document.querySelector("#blog-content").innerHTML = postHTML;
    }

    let delBtns = document.querySelectorAll("#delete-btn");

    for (let del of delBtns) {
      del.addEventListener("click", async function (e) {
        let delClick = e.target;
        let postId = delClick.dataset.id;

        try {
          await fetch("http://localhost:5000/posts/" + postId, {
            method: "DELETE",
          });
          delClick.parentNode.parentNode.remove();
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function formatDate(dateObj) {
  return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
}
