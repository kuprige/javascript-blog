//titleClickHandler
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!");

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  console.log("clickedElement", clickedElement);
  clickedElement.classList.add("active");

  const activeArticles = document.querySelectorAll(".posts article.active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  const articleSelector = clickedElement.getAttribute("href");
  console.log(articleSelector);

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  targetArticle.classList.add("active");
};
const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

//generateTitleLinks
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author";

function generateTitleLinks(customSelector = "") {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(articles);
  console.log(customSelector);

  let html = "";

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    console.log(articleId);

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";
    console.log(linkHTML);

    titleList.innerHTML = titleList.innerHTML + linkHTML;
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  console.log(links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

//generateTags

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapperList = article.querySelector(optArticleTagsSelector);

    let html = "";

    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);

    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    for (let tag of articleTagsArray) {
      const linkHTML =
        '<li><a href="#tag-' + tag + '"><span>' + tag + "</span></a></li>";
      console.log(linkHTML);

      tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
      html = html + linkHTML;
    }
    tagsWrapperList.innerHTML = html;
  }
}

generateTags();

// tagClickHandler

const tagClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Tag was clicked");
  console.log(MouseEvent + ".");

  const href = clickedElement.getAttribute("href");
  console.log(href);

  const tag = href.replace("#tag-", "");
  console.log(tag);

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);

  for (let activeTagLink of activeTagLinks) {
    activeTagLink.classList.remove("active");
  }

  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTagLinks);

  for (let targetTagLink of targetTagLinks) {
    targetTagLink.classList.add("active");
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
  tagClickHandler();
};

function addClickListenersToTags() {
  const href = clickedElement.getAttribute("href");
  console.log(href);

  const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTagLinks);

  for (let targetTagLink of targetTagLinks) {
    targetTagLink.addEventListener("click", tagClickHandler);
    tagClickHandler();
  }
}
addClickListenersToTags();

//generateAuthors
function generateAuthors() {
  const authors = document.querySelectorAll(optArticleAuthorSelector);

  for (let author of authors) {
    const authorsWrapperList = author.querySelector(optArticleAuthorSelector);

    let html = "";

    const authorTags = author.getAttribute("data-author");
    console.log(authorTags);
  }
  const linkHTML =
    '<li><a href="#-' + authors + '"><span>' + authors + "</span></a></li>";
  console.log(linkHTML);

  authorsWrapperList.innerHTML = authorsWrapperList.innerHTML + linkHTML;
  html = html + linkHTML;

  authorsWrapperList.innerHTML = html;
}
generateAuthors();

// authorClickHandler

const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Tag was clicked");
  console.log(MouseEvent + ".");

  const span = clickedElement.getAttribute("span");
  console.log(span);

  const href = span.replace("span", "");
  console.log(href);

  const activeauthorsLinks = document.querySelectorAll(
    'a.active[href^="span-"]'
  );
  console.log(activeauthorsLinks);

  for (let activeauthorsLink of activeauthorsLinks) {
    activeauthorsLink.classList.remove("active");
  }

  const targetauthorsLinks = document.querySelectorAll(
    'a[span="' + span + '"]'
  );
  console.log(targetauthorsLinks);

  for (let targetauthorsLink of targetauthorsLinks) {
    targetauthorsLink.classList.add("active");
  }

  generateTitleLinks('[data-authors="' + span + '"]');
  tagClickHandler();
};

function addClickListenersToAuthors() {
  const href = clickedElement.getAttribute("href");
  console.log(href);

  const targetauthorLinks = document.querySelectorAll('a[span="' + span + '"]');
  console.log(targetauthorLinks);

  for (let targetauthorLink of targetauthorLinks) {
    targetTauthorLink.addEventListener("click", tagClickHandler);
    tagClickHandler();
  }

  addClickListenersToTags();
}
