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

        console.log(post.author)
      
  
        postHTML += `
        <tr>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${formatDate(dateObj)}</td>
            <td>
            <a href="#" id="delete-btn" data-id="${
                post["_id"]}">Delete</a>
            <a href="/web_com/blog-client-template/admin/create-post.html">Update</a>
        </td>
    </tr>
        `;
  
        document.querySelector("#blog-content").innerHTML = postHTML;
      }

      deletePost()

      
    } catch (error) {
      console.log(error);
    }


 
  }
  
  function formatDate(dateObj) {
    return `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  }


  


  function deletePost() {

    let del = document.querySelectorAll("#delete-btn");
    console.log(del)
    for(delPost of del){
        delPost.addEventlistener("click", function(e) {
                e.preventDefault();
                let delClick = e.target.id;
                let postId = delClick.dataset.id;


                console.log(delClick)
                console.log(postId)
        })
    }



  }
  
  