// URLからユーザー名を取得
var params = new URLSearchParams(window.location.search);
var user = params.get("user") || "default";

// 掲示板タイトル
document.getElementById("boardTitle").textContent = user + " の掲示板";

// ユーザーごとの掲示板データ
var posts = JSON.parse(localStorage.getItem("posts_" + user) || "[]");

function displayPosts() {
    var container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach(function(post) {
        var div = document.createElement("div");
        div.className = "post-card";
        div.innerHTML =
            "<h4>" + post.name + "</h4>" +
            "<p>" + post.message + "</p>";
        container.appendChild(div);
    });
}

document.getElementById("postForm").addEventListener("submit", function(e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var message = document.getElementById("message").value;

    posts.push({ name: name, message: message });
    localStorage.setItem("posts_" + user, JSON.stringify(posts));

    displayPosts();
    this.reset();
});

displayPosts();


