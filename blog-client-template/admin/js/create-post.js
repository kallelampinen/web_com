window.onload = function(){

    createPost()
}

function createPost(){

    let createPost = document.getElementById("createPost");

    createPost.addEventListener("submit", async function(e){


        e.preventDefault();
        console.log(e.target)
        let formData= {
            content: document.getElementById("createContent").value,
            title: document.getElementById("createTitle").value,
            author: document.getElementById("createAuthor").value
        };

        let myJson = JSON.stringify(formData);

        try {

            const create = await fetch("http://localhost:5000/posts", {
                method: "POST", 
                headers: {
                    "content-type": "application/json"
                }, 
                body: myJson
            })
            
        } catch (error) {
            console.log(error)
        }finally{

            window.location.replace("/web_com/blog-client-template/index.html")
        }

      
    })
}