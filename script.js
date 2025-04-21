const feed = document.getElementById("feed");
const stories = document.getElementById("stories");
const modal = document.getElementById("storyModal");
const modalImg = document.getElementById("modalImg");

// ✅ 1. 限時動態名稱（請自由修改 storyNames）
const storyNames = ["Rachel", "Monica", "Phoebe", "Ross", "Chandler", "Joey", "Janice", "Gunther", "Mike", "Carol"];

for (let i = 0; i < storyNames.length; i++) {
  const story = document.createElement("div");
  story.className = "story";
  story.innerHTML = `
    <img src="https://i.pravatar.cc/60?img=${i + 1}" data-full="https://picsum.photos/600/800?random=${i + 1}" />
    <p>${storyNames[i]}</p>
  `;
  stories.appendChild(story);
}

// ✅ 點擊限時預覽
stories.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    modalImg.src = e.target.dataset.full;
    modal.classList.remove("hidden");
  }
});
modal.addEventListener("click", () => modal.classList.add("hidden"));

// ✅ 2. 建立貼文（作者名稱從你設定的 postNames 隨機挑一個）
const postNames = ["你自己", "Jasmine", "Peko", "Yuki", "Hana"];

function createPost() {
  const div = document.createElement("div");
  div.className = "post";

  const likes = Math.floor(Math.random() * 9000 + 1000);
  const account = postNames[Math.floor(Math.random() * postNames.length)];

  div.innerHTML = `
    <div class="post-header">
      <img src="https://i.pravatar.cc/40?img=${Math.floor(Math.random()*70)}" class="avatar">
      <span class="username">${account}</span>
    </div>
    <img src="https://picsum.photos/500/300?random=${Math.random()}" class="post-img">
    <div class="post-actions">
      <i class="fas fa-heart like-btn"></i>
      <i class="fas fa-comment"></i>
      <i class="fas fa-bookmark"></i>
    </div>
    <div class="post-likes">${likes.toLocaleString()} 個讚</div>
    <div class="post-caption"><strong>${account}</strong> 定價完成，敬請期待！</div>
    <div class="comment-section">
      <input type="text" placeholder="新增留言……" class="comment-input">
      <div class="comments"></div>
    </div>
  `;
  feed.appendChild(div);
}

// ✅ 自動產生 5 則貼文
for (let i = 0; i < 5; i++) createPost();

// ✅ 留言與按讚互動
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("like-btn")) {
    e.target.classList.toggle("heart");
  }

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