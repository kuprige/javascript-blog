//titleClickHandler
const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  console.log('clickedElement', clickedElement);
  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);
  targetArticle.classList.add('active');
};
const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

//generateTitleLinks
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(articles);
  console.log(customSelector);

  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    console.log(articleId);

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    const linkHTML =
    '<li><a href="#' +
    articleId +
    '"><span>' +
    articleTitle +
    '</span></a></li>';
    console.log(linkHTML);

    titleList.innerHTML = titleList.innerHTML + linkHTML;
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();
