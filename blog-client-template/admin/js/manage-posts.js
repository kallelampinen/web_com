window.onload = function () {
  fetchAllPosts();
};

async function fetchAllPosts() {
  try {
    const response = await fetch("http://localhost:5000/posts");
    const posts = await response.json();

    let postHTML = "";
    for (post of posts) {
      let dateObj = new Date(post.date);

      postHTML += `
        <tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.tags}</td>
            <td>${formatDate(dateObj)}</td>
            <td id="center-icons">
            <a href="#" class="admin-links" id="delete-btn"  ><i class="far fa-trash-alt" data-id="${
              post["_id"]
            }"></i></a>
            <a href="/web_com/blog-client-template/admin/update-post.html?id=${
              post["_id"]
            }" class="admin-links"><i class="fas fa-edit"></i></a>
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
          delClick.parentNode.parentNode.parentNode.remove();
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
  let dateString = String(dateObj).split(" ").splice(0,5).join(" ");
  return dateString;
}
