let startButton = document.getElementById('start-button');
let messageTextTextarea = document.getElementById('message-text-textarea');

let freePhoto = null;
let freePhotoAlbum = null;
let freePhotoButton = document.getElementById('free-photo-button');

let privatPhotos = [];
let privatPhotoAlbums = [];
let privatPhotosButton = document.getElementById('privat-photo-button');

let urlParams = new URLSearchParams(window.location.search);
let ladyId = urlParams.get('ladyId');

let popup = document.getElementById('popup');
let popupContentBlock = document.getElementById('popup-refresh-content');

function PopUpShow() {
    popup.style.display = 'block';
}

function PopUpHide() {
    popupContentBlock.innerHTML = '';
    popup.style.display = 'none';
}

document.getElementById('close-popup-button').onclick = function () {PopUpHide()}

messageTextTextarea.oninput = function () {
    if (!messageTextTextarea.value) {
        messageTextTextarea.style.border = '2px solid #f00';
    } else {
        messageTextTextarea.style.border = 'none';
    }
}

function openAlbum(albumId, albumName) {
    popupContentBlock.innerHTML = '';

    let url = `https://www.charmdate.com/clagt/woman/women_album_list.php?albumid=${albumId}&womanid=${ladyId}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let template = document.implementation.createHTMLDocument();
            template.body.innerHTML = xhr.responseText;

            for (let element of template.querySelectorAll('td[width="25%"] td[height="90"] a img')){
                let div = document.createElement('div');
                div.className = 'popup-block';
                div.innerHTML = "<br>";
                div.dataset.url = element.src;
                div.onclick = function () {
                    freePhoto = element.src;
                    freePhotoAlbum = albumName;

                    privatPhotosButton.removeAttribute('disabled');

                    let img = document.createElement('img');
                    img.src = freePhoto;
                    img.onclick = function () {
                        privatPhotos = [];
                        document.getElementById('privat-photos').innerHTML = '';
                        privatPhotosButton.setAttribute('disabled', true);

                        freePhotoButton.removeAttribute('disabled');
                        freePhoto = null;
                        freePhotoAlbum = null;
                        img.remove();
                    }

                    document.getElementById('free-photo').appendChild(img);
                    freePhotoButton.setAttribute('disabled', true);

                    PopUpHide()
                }

                let img = document.createElement('img');
                img.className = 'popup-img';
                img.src = element.src;

                div.appendChild(img);
                popupContentBlock.appendChild(div);
            }
        }
    }

    xhr.send();
}

freePhotoButton.onclick = function () {
    PopUpShow()

    let url = `https://www.charmdate.com/clagt/woman/women_album.php?womanid=${ladyId}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let template = document.implementation.createHTMLDocument();
            template.body.innerHTML = xhr.responseText;

            for (let element of template.querySelectorAll('td[width="25%"]')) {
                let albumName = element.querySelector('td.albumfont').innerText

                let div = document.createElement('div');
                div.className = 'popup-block';
                div.innerHTML = albumName + "<br>";
                div.dataset.albumId = new URL(element.querySelector('img').parentElement.href).searchParams.get('albumid');
                div.onclick = function () {openAlbum(div.dataset.albumId, albumName)}

                let img = document.createElement('img');
                img.className = 'popup-img';
                img.src = element.querySelector('img').src;

                div.appendChild(img);
                popupContentBlock.appendChild(div);
            }

        }
    };

    xhr.send();
}

function openPrivatAlbum(albumId, albumName) {
    popupContentBlock.innerHTML = '';

    let url = `https://www.charmdate.com/clagt/woman/private_album_list.php?albumid=${albumId}&womanid=${ladyId}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let template = document.implementation.createHTMLDocument();
            template.body.innerHTML = xhr.responseText;

            for (let element of template.querySelectorAll('td[width="25%"] td[height="90"] a img')){
                let div = document.createElement('div');
                div.className = 'popup-block';
                div.innerHTML = "<br>";
                div.dataset.url = element.src;
                div.onclick = function () {
                    let privatPhoto = element.src;

                    if (privatPhotos.indexOf(privatPhoto) !== -1) {
                        PopUpHide()
                        return
                    }

                    let img = document.createElement('img');
                    img.src = privatPhoto;
                    img.onclick = function () {
                        privatPhotosButton.removeAttribute('disabled');
                        privatPhotos.indexOf(privatPhoto) !== -1 && privatPhotos.splice(privatPhotos.indexOf(privatPhoto), 1) && privatPhotoAlbums.splice(privatPhotos.indexOf(privatPhoto), 1)
                        img.remove();
                    }

                    privatPhotos.push(privatPhoto);
                    privatPhotoAlbums.push(albumName);
                    document.getElementById('privat-photos').appendChild(img);

                    PopUpHide()

                    if (privatPhotos.length===3) {
                        privatPhotosButton.setAttribute('disabled', true);
                    }

                }

                let img = document.createElement('img');
                img.className = 'popup-img';
                img.src = element.src;

                div.appendChild(img);
                popupContentBlock.appendChild(div);
            }
        }
    }

    xhr.send();
}

privatPhotosButton.onclick = function () {
    PopUpShow()

    let url = `https://www.charmdate.com/clagt/woman/private_photo_list.php?womanid=${ladyId}`;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            let template = document.implementation.createHTMLDocument();
            template.body.innerHTML = xhr.responseText;

            for (let element of template.querySelectorAll('td[width="25%"]')) {
                let albumName = element.querySelector('td.albumfont').innerText;

                let div = document.createElement('div');
                div.className = 'popup-block';
                div.innerHTML = albumName + "<br>";
                div.dataset.albumId = new URL(element.querySelector('img').parentElement.href).searchParams.get('albumid');
                div.onclick = function () {openPrivatAlbum(div.dataset.albumId, albumName)}

                let img = document.createElement('img');
                img.className = 'popup-img';
                img.src = element.querySelector('img').src;

                div.appendChild(img);
                popupContentBlock.appendChild(div);
            }

        }
    };

    xhr.send();
}

startButton.onclick = function () {
    if (!messageTextTextarea.value) {
        messageTextTextarea.style.border = '2px solid #f00';
        return
    }

    if (messageTextTextarea.value.length < 200 || messageTextTextarea.value > 6000) {
        alert(`Длина текста должна быть в пределах от 200 до 6000 символов! Текущий показатель - ${messageTextTextarea.value.length}`)
        return
    }

    let shouldStart = confirm(`Подтвердите запуск`);

    if (shouldStart) {
        let nextPage = `https://www.charmdate.com/clagt/first_emf.php?groupshow=4&womanid=${ladyId}&sentMail=quota_not_full`;

        chrome.storage.local.set({
            'mailData': {
                'messageText': messageTextTextarea.value,
                'freePhoto': freePhoto,
                'freePhotoAlbum': freePhotoAlbum,
                'privatPhotos': privatPhotos,
                'privatPhotoAlbums': privatPhotoAlbums
            }
        }, function() {});

        document.location.href = nextPage;
    }
}
