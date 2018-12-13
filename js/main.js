// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var COMMENT_PHRASES = [
  'Всё отлично!',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

var NAMES = [
  'Артём',
  'Сергей',
  'Иван',
  'Михаил',
  'Руслан',
];


var photosDescriptor = function (photos) {
  var photosDescription = [];

  for (var i = 0; i < photos; i++) {
    photosDescription[i] =
      {
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomInt(15, 201),
        comments: [],
      };
    var jMax = getRandomInt(0, 2);
    for (var j = 0; j <= jMax; j++) {
      photosDescription[i].comments[j] = {
        avatar: 'img/avatar-' + (i + 1) + '.svg',
        message: COMMENT_PHRASES [getRandomInt(0, COMMENT_PHRASES.length)],
        name: NAMES [getRandomInt(0, NAMES.length)],
      };
    }
  }
  return photosDescription;
};


var makeAnotherUsersPictures = function (photos) {
  var photosDescription = photosDescriptor(photos);
  var template = document.querySelector('#picture');
  var picture = template.content.querySelector('.picture').cloneNode(true);
  var pictureObjectsArray = [];
  for (var i = 0; i < photosDescription.length; i++) {
    var templateContent = {
      img: picture.querySelector('.picture__img').cloneNode(true),
      likes: picture.querySelector('.picture__likes').cloneNode(true),
      comments: [],
    };
    for (var j = 0; j < photosDescription[i].comments.length; j++) {
      templateContent.comments[j] = picture.querySelector('.picture__likes').cloneNode(true);
      templateContent.comments[j].textContent = photosDescription[i].comments[j].message;
    }
    templateContent.img.src = photosDescription[i].url;
    templateContent.likes.textContent = photosDescription[i].likes;
    pictureObjectsArray[i] = {
      img: templateContent.img,
      likes: templateContent.likes,
      comments: [],
    };
    for (var j = 0; j < photosDescription[i].comments.length; j++) {
      pictureObjectsArray[i].comments[j] = templateContent.comments[j];
    }
  }
  return pictureObjectsArray;
};

var multiInsert = function (pictureObjectsArray) {

  var documentFragmentVar = new DocumentFragment();

  for (var i = 0; i < pictureObjectsArray.length; i++) {
    var template = document.querySelector('#picture').cloneNode(true);
    var reference = template.content.querySelector('.picture').cloneNode();
    var paragraph = template.content.querySelector('.picture__info').cloneNode(true);
    var spanComments = paragraph.querySelector('.picture__comments').cloneNode();
    var spanLikes = paragraph.querySelector('.picture__likes').cloneNode();
    spanComments.textContent = pictureObjectsArray[i].comments.length;
    spanLikes.textContent = pictureObjectsArray[i].likes;
    reference.appendChild(pictureObjectsArray[i].img);
    reference.appendChild(paragraph);
    documentFragmentVar.appendChild(reference);
  }
  var section = document.querySelector('.pictures');
  section.appendChild(documentFragmentVar);
};

multiInsert(makeAnotherUsersPictures(25));

var bigPicFilling = function (pictureObject) {

  var pictureObjectArray = makeAnotherUsersPictures(1);
  var pictureObject = pictureObjectArray[0];

  var bigPic = document.querySelector('.big-picture');
  bigPic.classList.remove('hidden');
  var divBigPic = bigPic.querySelector('.big-picture__img');
  var bigPicImg = divBigPic.querySelector('img');
  bigPicImg.src = pictureObject.img.src;
  var bigPicLikesCount = bigPic.querySelector('.likes-count');
  bigPicLikesCount.textContent = pictureObject.likes.textContent;
  var bigPicCommentsCount = bigPic.querySelector('.comments-count');
  bigPicCommentsCount.textContent = pictureObject.comments.length;
  var bigPicComments = bigPic.querySelector('.social__comments');
  for (var j = 0, k = 1; j < pictureObject.comments.length; j++, k++) {
    var liComment = bigPicComments.querySelector('li:nth-child(' + k + ')');
    var imgComment = liComment.querySelector('img');
    imgComment.src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
    var pComment = liComment.querySelector('p');
    pComment.textContent = pictureObject.comments[j].textContent;
  }
  if (j !== 2) {
    liComment = bigPicComments.querySelector('li:nth-child(2)');
    liComment.remove();
  }
};

bigPicFilling(makeAnotherUsersPictures(1));

var photoDescriptionInsert = function (string) {
  var socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = string;
};

photoDescriptionInsert('Тестируем новую камеру!');

var hideElements = function () {
  var socialCommentCount = document.querySelector('.social__comment-count');
  socialCommentCount.classList.add('visually-hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
};

hideElements();
