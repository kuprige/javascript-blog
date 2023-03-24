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
  optArticleTagsSelector = ".post-tags .list";
//optArticleAuthorSelector = ".post-author";

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
};

function addClickListenersToTags() {
  const tags = document.querySelectorAll(".post-tags .list a");
  console.log(tags);

  for (let targetTagLink of targetTagLinks) {
    targetTagLink.addEventListener("click", tagClickHandler);
  }
}

addClickListenersToTags();

// //generateAuthors
// function generateAuthors() {
//   const authors = document.querySelectorAll(".post-author");

//   for (let author of authors) {
//     author.addEventListener("click", titleClickHandler);
//   }

//   let html = "";

//   const authorTags = article.getAttribute("data-author");
//   console.log(authorTags);

//   for (let tag of authorsTagsArray) {
//     const linkHTML =
//       '<li><a href="tag-' + tag + '"><span>' + tag + "</span></a></li>";
//     console.log(linkHTML);

//     tagsWrapperList.innerHTML = tagsWrapperList.innerHTML + linkHTML;
//     html = html + linkHTML;
//   }
//   tagsWrapperList.innerHTML = html;

//   titleList.innerHTML = html;
// }

// generateAuthors();

// // authorClickHandler
// const authorClickHandler = function (event) {
//   event.preventDefault();
//   const clickedElement = this;
//   console.log("Tag was clicked");
//   console.log(MouseEvent + ".");

//   const href = clickedElement.getAttribute("href");
//   console.log(href);

//   const tag = href.replace("#tag-", "");
//   console.log(tag);

//   const activeTagLinks = article.querySelectorAll('a.active[href^="#tag-"]');
//   console.log(activeTagLinks);

//   for (let activeTagLink of activeTagLinks) {
//     activeTagLink.classList.remove("active");
//   }

//   const targetTagLinks = article.querySelectorAll('a[href="' + href + '"]');
//   console.log(targetTagLinks);

//   for (let targetTagLink of targetTagLinks) {
//     targetTagLink.classList.add("active");
//   }
//   generateTitleLinks('[data-author="' + tag + '"]');
//   authorClickHandler();
// };
// //addClickListenersToAuthors
// function addClickListenersToAuthors() {
//   const href = clickedElement.getAttribute("href");
//   console.log(href);

//   const targetTagLinks = article.querySelectorAll('a[href="' + href + '"]');
//   console.log(targetTagLinks);

//   for (let targetTagLink of targetTagLinks) {
//     targetTagLink.addEventListener("click", authorClickHandler);
//     authorClickHandler();
//   }
// }
// addClickListenersToAuthors();
