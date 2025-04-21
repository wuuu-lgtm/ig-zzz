// 抓到主貼文容器
const feed = document.getElementById("feed");

// 建立一個假貼文
function createPost() {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `
    <div class="post-header">
      <img src="https://i.pravatar.cc/40?img=${Math.floor(Math.random()*70)}" class="avatar">
      <span class="username">user_${Math.floor(Math.random()*100)}</span>
    </div>
    <img src="https://picsum.photos/500/300?random=${Math.random()}" class="post-img">
    <div class="post-actions">❤️ 💬 📤</div>
    <div class="post-caption"><strong>user</strong> 自動載入的貼文</div>
    <div class="comment-section">
      <input type="text" placeholder="留下留言..." class="comment-input">
      <div class="comments"></div>
    </div>
  `;
  feed.appendChild(div);
}

// 初始生成幾筆貼文
for (let i = 0; i < 4; i++) createPost();

// 無限滾動載入貼文
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    createPost();
  }
});

// 留言互動功能
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("comment-input")) {
    e.target.addEventListener("keypress", function (event) {
      if (event.key === "Enter" && e.target.value.trim() !== "") {
        const comment = document.createElement("div");
        comment.innerText = `你：${e.target.value}`;
        e.target.parentNode.querySelector(".comments").appendChild(comment);
        e.target.value = "";
      }
    });
  }
});