/* -------------------------
   初期順を保存（超重要）
-------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const articles = document.querySelectorAll("#articles article");

  articles.forEach((article, index) => {
    article.dataset.index = index;
  });
});

/* -------------------------
   スコア取得
-------------------------- */
function getScore(article) {
  const el = article.querySelector(".score");
  const val = el ? parseFloat(el.dataset.score) : NaN;
  return isNaN(val) ? 0 : val;
}

/* -------------------------
   日付取得（超安定版）
-------------------------- */
function getDate(article) {
  const text = article.textContent;
  const cleanText = text.replace(/\s+/g, "");

  const match = cleanText.match(/(\d{2})\/(\d{1,2})\/(\d{1,2})/);
  if (!match) return 0;

  const year = "20" + match[1];
  const month = match[2].padStart(2, "0");
  const day = match[3].padStart(2, "0");

  const iso = `${year}-${month}-${day}`;
  const date = new Date(iso);

  return isNaN(date.getTime()) ? 0 : date.getTime();
}

/* -------------------------
   リセット
-------------------------- */
function resetAll() {
  const articles = document.querySelectorAll("#articles article");

  articles.forEach(article => {
    article.style.display = "";
  });
}

/* -------------------------
   4.0以上 + 新着順
-------------------------- */
function filterHighScore() {
  const container = document.getElementById("articles");
  const articles = Array.from(container.querySelectorAll("article"));

  resetAll();

  // 新着順にソート
  articles.sort((a, b) => {
    const dateDiff = getDate(b) - getDate(a);

    if (dateDiff !== 0) {
      return dateDiff;
    }

    return a.dataset.index - b.dataset.index;
  });

  articles.forEach(article => {
    if (getScore(article) < 4.0) {
      article.style.display = "none";
    }
    container.appendChild(article);
  });
}



/* -------------------------
   高い順
-------------------------- */
function sortByScore() {
  const container = document.getElementById("articles");
  const articles = Array.from(container.querySelectorAll("article"));

  resetAll();

  articles.sort((a, b) => getScore(b) - getScore(a));

  articles.forEach(a => container.appendChild(a));
}

/* -------------------------
   低い順
-------------------------- */
function sortByScoreLow() {
  const container = document.getElementById("articles");
  const articles = Array.from(container.querySelectorAll("article"));

  resetAll();

  articles.sort((a, b) => getScore(a) - getScore(b));

  articles.forEach(a => container.appendChild(a));
}

/* -------------------------
   新着順（同日安定版）
-------------------------- */
function sortByDate() {
  const container = document.getElementById("articles");
  const articles = Array.from(container.querySelectorAll("article"));

  resetAll();

  articles.sort((a, b) => {
    const dateDiff = getDate(b) - getDate(a);

    // 日付が違う → 新着順
    if (dateDiff !== 0) {
      return dateDiff;
    }

    // 同じ日 → 元の順番
    return a.dataset.index - b.dataset.index;
  });

  articles.forEach(a => container.appendChild(a));
}

/* -------------------------
   スコア完全一致フィルタ
-------------------------- */
function filterByScoreExact(score) {
  const articles = document.querySelectorAll("#articles article");

  articles.forEach(article => {
    const s = getScore(article);

    if (s === score) {
      article.style.display = "";
    } else {
      article.style.display = "none";
    }
  });
}

/* -------------------------
   メニュー開閉
-------------------------- */
function toggleScoreMenu() {
  const menu = document.getElementById("scoreMenu");

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
}




