// 🔸 限時動態假資料
const stories = document.getElementById("stories");
for (let i = 1; i <= 10; i++) {
  const story = document.createElement("div");
  story.className = "story";
  story.innerHTML = `
    <img src="https://i.pravatar.cc/60?img=${i}" data-full="https://picsum.photos/600/800?random=${i}" />
    <p>user${i}</p>
  `;
  stories.appendChild(story);
}

// 🔸 限時點擊 → 開 modal
const modal = document.getElementById("storyModal");
const modalImg = document.getElementById("modalImage");

stories.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    modalImg.src = e.target.dataset.full;
    modal.classList.remove("hidden");
  }
});
modal.addEventListener("click", () => modal.classList.add("hidden"));

// 🔸 Feed 假貼文 + 無限滑動
const feed = document.getElementById("feed");
function createPost() {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `
    <div class="post-header">
      <img src="https://i.pravatar.cc/40?img=${Math.floor(Math.random()*70)}" class="avatar">
      <span class="username">user${Math.floor(Math.random()*100)}</span>
    </div>
    <img src="https://picsum.photos/500/300?random=${Math.random()}" class="post-img">
    <div class="post-actions">
      <i class="fas fa-heart like-btn"></i>
      <i class="fas fa-comment"></i>
    </div>
    <div class="post-caption"><strong>user</strong> 自動載入貼文</div>
    <div class="comment-section">
      <input type="text" placeholder="留言..." class="comment-input">
      <div class="comments"></div>
    </div>
  `;
  feed.appendChild(div);
}
for (let i = 0; i < 4; i++) createPost();
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) createPost();
});

// 🔸 按讚動畫 + 留言
document.addEventListener("click", function (e) {
  // 按讚
  if (e.target.classList.contains("like-btn")) {
    e.target.classList.toggle("heart");
  }

  // 留言
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

// 🔸 Explore 切換
const exploreBtn = document.getElementById("exploreBtn");
const explore = document.getElementById("explore");
const exploreGrid = document.getElementById("exploreGrid");
exploreBtn.addEventListener("click", () => {
  explore.classList.toggle("hidden");
  feed.classList.toggle("hidden");
});

for (let i = 0; i < 9; i++) {
  const img = document.createElement("img");
  img.src = `https://picsum.photos/300/300?random=${Math.random()}`;
  exploreGrid.appendChild(img);
}