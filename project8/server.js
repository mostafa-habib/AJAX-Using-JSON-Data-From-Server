//prototype to post
function Post(title,contentt,m){
    this.title=title;
    this.contentt=contentt;
}
//method to creat post depends on prototype parameter
Post.prototype.generatePostHtml=function (){
    return '<div class="card shadow-lg shadow border my-1">' +
        '                <div class="card-body">' +
        '                    <h4 class="card-title text-center fw-bold">'+ this.title +'</h4>' +
        '                    <p class="text-center card-text">'+ this.contentt+'</p>' +
        '                </div>' +
        '            </div>';

};

var postCounter=document.getElementById("publishContent");
//array to save objects come from server
var posts=[];

var req=new XMLHttpRequest();
//when be change in request state
req.onreadystatechange=function (){
    // console.log("status " + this.status);
    // console.log("status text " + this.statusText);
    // console.log("ready state " + this.readyState);
    // console.log("response " + this.response);
    // console.log("response text" + this.responseText);
    // console.log("=======================================\n");

    if(this.status === 200 && this.readyState === 4){
        //change type of date from string to object
        var postsResponse= JSON.parse(this.response)
        //loop to read data object bu object
        for (var i =0 ;i < postsResponse.length ;i++){
            //read title and body attribute from data and pass them to post prototype to generate post
            var newPost=new Post(postsResponse[i].title,postsResponse[i].body)
            posts.push(newPost);
            postCounter.insertAdjacentHTML('beforeend',newPost.generatePostHtml());
        }


    }



};

req.open("GET","https://jsonplaceholder.typicode.com/posts",true);
req.send();

