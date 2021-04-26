
    let newPost = document.getElementById("submitBtn");
   

    newPost.addEventListener("click", async function(e){
        e.preventDefault();
       const blogData = {
            title: document.getElementById("createTitle").value,
            content: document.getElementById("createContent").value,
            author: document.getElementById("createAuthor").value
       }
       const myJson = JSON.stringify(blogData);
       try {
           await fetch("http://localhost:5000/posts", {
               method: "POST",
               headers:{
                "content-type": "application/json"
               },
               body: myJson,
           })
           
       } catch (error) {
           console.log(error)
           
       }finally{
           window.location.replace("/web_com/blog-client-template/index.html")
       }


    })
