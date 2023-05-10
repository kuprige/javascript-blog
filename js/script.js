"use strict";

// titleClickHandler
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

// generateTitleLinks
const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optArticleAuthorSelector = ".post-author",
  optTagsListSelector = ".tags.list",
  optAuthorsListSelector = ".authors.list";

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

// calculateTagsParams
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999,
  };

  for (let tag in tags) {
    const count = tags[tag];
    if (count > params.max) {
      params.max = count;
    }
    if (count < params.min) {
      params.min = count;
    }
    console.log(tag + " is used " + tags[tag] + " times");
  }

  return params;
}
const optCloudClassCount = 5;
const optCloudClassPrefix = "tag-size-";
//calculateTagClass
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}


// generateTags

function generateTitleLinks(customSelector = "", tag = "") {
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    const articleTitle = article.querySelector(optArticleTitleSelector).innerHTML;
    const articleTags = article.getAttribute("data-tags");

    const articleTagsArray = articleTags.split(" ");
    let html = "";

    if (!tag || articleTagsArray.includes(tag)) {
      html =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";

      const linkList = document.querySelector(optTitleListSelector);
      linkList.insertAdjacentHTML("beforeend", html);
    }
  }
}

function addClickListenersToTags() {
  const tagLinks = document.querySelectorAll("a[href^='#tag-']");

  for (let tagLink of tagLinks) {
    tagLink.addEventListener("click", function (event) {
      event.preventDefault();

      const href = tagLink.getAttribute("href");
      const tag = href.replace("#tag-", "");

      generateTitleLinks("", tag);
    });
  }
}

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
  const targetTagLinks = document.querySelectorAll(".post-tags .list a");
  console.log(targetTagLinks);

  for (let targetTagLink of targetTagLinks) {
    targetTagLink.addEventListener("click", tagClickHandler);
  }
}

addClickListenersToTags();

//generateAuthors
function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  const authorList = document.querySelector(optAuthorsListSelector);
  const authors = {};

  for (let article of articles) {
    const author = article.querySelector(optArticleAuthorSelector);
    const authorName = author.innerHTML;

    if (!authors[authorName]) {
      authors[authorName] = 1;
    } else {
      authors[authorName]++;
    }
  

    const authorWrapper = article.querySelector("p.post-author");
    console.log(authorWrapper);

    const articleAuthor = article.getAttribute("data-author");
    console.log(articleAuthor);

    const linkHTML =
        '<a href="#author-' +
        articleAuthor +
        '"><span>' +
        articleAuthor +
        "</span></a>";
    console.log(linkHTML);

    authorWrapper.innerHTML += linkHTML;
  }
}

generateAuthors();

//authorClickHandler
const authorClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Author was clicked");

  const href = clickedElement.getAttribute("href");
  console.log(href);

  const author = href.replace("#author-", "");
  console.log(author);

  const activeAuthorLinks = document.querySelectorAll(
    'a.active[href^="#author-"]'
  );
  console.log(activeAuthorLinks);

  generateTitleLinks('[data-author="' + author + '"]');
};

function addClickListenersToAuthors() {
  const activeAuthorLinks = document.querySelectorAll("p.post-author a");
  console.log(activeAuthorLinks);

  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.addEventListener("click", authorClickHandler);
  }
}

addClickListenersToAuthors();