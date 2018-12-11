// Возвращает случайное целое число между min (включительно) и max (не включая max)
// Использование метода Math.round() даст вам неравномерное распределение!
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var photosDescriptor = function (photos) {

  var photosDescription = [];

  var commentPhrase = [
    'Всё отлично!',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.'
  ];

  var nameArray = [
    'Артём',
    'Сергей',
    'Иван',
    'Михаил',
    'Руслан'
  ];

  for (var i = 0; i < photos; i++) {
    photosDescription[i] = [
      {
        url: 'photos/' + (i+1) + '.jpg',
        likes: getRandomInt(15, 201),
        comment: [{
          avatar: 'img/avatar-' + (i+1) + '.svg',
          message: commentPhrase [getRandomInt(0, commentPhrase.length)],
          name: nameArray [getRandomInt(0, nameArray.length)]
        },
        {
          avatar: 'img/avatar-' + (i+1) + '.svg',
          message: commentPhrase [getRandomInt(0, commentPhrase.length)],
          name: nameArray [getRandomInt(0, nameArray.length)]
        }
        ]
      }
    ];
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
      comment: [picture.querySelector('.picture__likes').cloneNode(true), picture.querySelector('.picture__likes').cloneNode(true)]
    };
    templateContent.img.src = photosDescription[i][0].url;
    templateContent.likes.textContent = photosDescription[i][0].likes;
    templateContent.comment[0].textContent = photosDescription[i][0].comment[0].message;
    templateContent.comment[1].textContent = photosDescription[i][0].comment[1].message;
    pictureObjectsArray[i] = {
      img: templateContent.img,
      likes: templateContent.likes,
      comment: [templateContent.comment[0], templateContent.comment[1]]
    };
  }
  return pictureObjectsArray;
};

var multiInsert = function (photosDescription, pictureObjectsArray) {

  var documentFragmentVar = new DocumentFragment();

  for (var i = 0; i < pictureObjectsArray.length; i++) {
    var template = document.querySelector('#picture').cloneNode(true);
    var reference = template.content.querySelector('.picture').cloneNode();
    var paragraph = template.content.querySelector('.picture__info').cloneNode();
    paragraph.appendChild(pictureObjectsArray[i].comment[0]);
    paragraph.appendChild(pictureObjectsArray[i].likes);
    reference.appendChild(pictureObjectsArray[i].img);
    reference.appendChild(paragraph);
    documentFragmentVar.appendChild(reference);
  }
  var section = document.querySelector('.pictures');
  section.appendChild(documentFragmentVar);
}

multiInsert(photosDescriptor(25), makeAnotherUsersPictures(25));

// var bigPic = document.querySelector('.big-picture');
// var bigPicComment = bigPic.querySelector('social__comments');
// console.log(bigPicComment);

var bigPicFilling = function (photos) {
  var pictureObjectsArray = makeAnotherUsersPictures(photos);
  console.log(pictureObjectsArray[0].comment[0]);
  var bigPic = document.querySelector('.big-picture');
  bigPic.classList.remove('hidden');
  var divBigPic = bigPic.querySelector('.big-picture__img');
  var bigPicImg = divBigPic.querySelector('img');
  bigPicImg.src = pictureObjectsArray[0].img.src;
  console.log(pictureObjectsArray);
  var bigPicLikesCount = bigPic.querySelector('.likes-count');
  bigPicLikesCount.textContent = pictureObjectsArray[0].likes.textContent;
  var bigPicCommentsCount = bigPic.querySelector('.comments-count');
  bigPicCommentsCount.textContent = pictureObjectsArray[0].comment.length;
  var bigPicComments = bigPic.querySelector('.social__comments');
  var liComment1 = bigPicComments.querySelector('li:nth-child(1)');
  var liComment2 = bigPicComments.querySelector('li:nth-child(2)');
  var imgComment1 = liComment1.querySelector('img');
  imgComment1.src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
  var imgComment2 = liComment2.querySelector('img');
  imgComment2.src = 'img/avatar-' + getRandomInt(1, 7) + '.svg';
  var pComment1 = liComment1.querySelector('p');
  pComment1.textContent = pictureObjectsArray[0].comment[0].textContent;
  var pComment2 = liComment2.querySelector('p');
  pComment2.textContent = pictureObjectsArray[0].comment[1].textContent;
}

bigPicFilling(25);

var photoDescriptionInsert = function (string) {
  var socialCaption = document.querySelector('.social__caption');
  socialCaption.textContent = string;
}

photoDescriptionInsert('Тестируем новую камеру!');

var hideElements = function () {
  var socialCommentCount = document.querySelector('.social__comment-count')
  socialCommentCount.classList.add('visually-hidden');
  var commentsLoader = document.querySelector('.comments-loader');
  commentsLoader.classList.add('visually-hidden');
}

hideElements();
