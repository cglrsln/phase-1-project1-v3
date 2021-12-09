fetch("https://www.boredapi.com/api/activity")
  .then(function (response) {
    return response.json();
  })
  .then(function (object) {
    console.log(object);
  })



  document.addEventListener("DOMContentLoaded", () => {
    let form = document.querySelector("#create-task-form")
    
    
    form.addEventListener('submit', (e) => {
      e.preventDefault()
  
    
      buildToDo(e.target.newTaskDescription.value)
      
      form.reset()
    })
  });
  


  function buildToDo(todo){
    let p = document.createElement('p')
    let btn = document.createElement('button')
    btn.addEventListener('click', handleDelete)
    btn.textContent = 'x'
    p.textContent = `${todo} `
    p.appendChild(btn)
    console.log(p)
    document.querySelector("#tasks").appendChild(p)
    }
  
  
    function handleDelete(e){
        e.target.parentNode.remove()
    }


 



    document.addEventListener("DOMContentLoaded", function () {
        addImage();
                
      });
      
      function addImage() {
        fetch("https://www.boredapi.com/api/activity")
          .then((resp) => resp.json())
          .then((data) => {
            //console.log(data);
            document.querySelector("#commentsList").textContent = data.activity;
            document.querySelector("#commentsList > li").textContent = data.type;
      
            
      
            data.comments.forEach((comment) => {
              const li = document.createElement("li");
              li.textContent = comment.content;
              document.querySelector("#commentsList > li").append(li);
            });
          });
      }