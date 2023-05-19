"use strict";

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector("#template-tag-link").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tag-cloud-link").innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector("#template-author-link").innerHTML
  ),
  authorCloudLink: Handlebars.compile(
    document.querySelector("#template-author-cloud-link").innerHTML
  ),
};

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

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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

// calculateTagClass
function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return optCloudClassPrefix + classNumber;
}

// generateTags
function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const tagsWrapperList = article.querySelector(optArticleTagsSelector);

    let html = "";
    const articleTags = article.getAttribute("data-tags");
    const articleTagsArray = articleTags.split(" ");

    for (let tag of articleTagsArray) {
      const linkData = {
        tag: tag,
      };
      const linkHTML = templates.tagLink(linkData);

      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      html = html + linkHTML;
    }

    tagsWrapperList.innerHTML = html;
  }

  const tagList = document.querySelector(optTagsListSelector);

  const tagsParams = calculateTagsParams(allTags);
  const allTagsData = { tags: [] };

  for (let tag in allTags) {
    const tagData = {
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    };

    allTagsData.tags.push(tagData);
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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
  const targetTagLinks = document.querySelectorAll(
    ".post-tags .list a, .tags.list a"
  );
  console.log(targetTagLinks);

  for (let targetTagLink of targetTagLinks) {
    targetTagLink.addEventListener("click", tagClickHandler);
  }
}

addClickListenersToTags();

// calculateAuthorsParams
function calculateAuthorsParams(authors) {
  const counts = Object.values(authors);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);
  return { minCount, maxCount };
}

function calculateAuthorClass(count) {
  if (count > 5) {
    return "popular-author";
  } else {
    return "normal-author";
  }
}

// generateAuthors
function generateAuthors() {
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const authorWrapperList = article.querySelector(optArticleAuthorSelector);
    let html = "";

    const articleAuthor = article.getAttribute("data-author");

    if (articleAuthor !== null) {
      const linkData = {
        authorName: articleAuthor,
        authorUrl: "#author-" + articleAuthor,
      };
      const linkHTML = templates.authorLink(linkData);

      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      html += linkHTML;
    }

    authorWrapperList.innerHTML = html;
  }

  const authorList = document.querySelector(optAuthorsListSelector);
  const allAuthorsData = { authors: [] };

  for (let author in allAuthors) {
    const authorData = {
      authorName: author,
      authorUrl: "#author-" + author,
      count: allAuthors[author],
      className: calculateAuthorClass(allAuthors[author]),
    };
    allAuthorsData.authors.push(authorData);
  }

  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();
// authorClickHandler
function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = event.target;
  const href = clickedElement.getAttribute("href");
  const author = href.replace("#author-", "");
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }
}

addClickListenersToAuthors();
