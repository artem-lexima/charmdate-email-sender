function replyPage(mailData) {
    let maleName = document.querySelector('table[id="womanreply"] td[width="84%"]').innerText.split('\n')[1].match('To: [A-Za-z]{1,20}')[0].split(' ')[1].trim();
    document.querySelector('textarea[name="replymsg"]').value = mailData.messageText.replaceAll("{name}", maleName);

    // Add Free Photo
    if (mailData.freePhoto) {
        mailData.freePhoto = mailData.freePhoto.replace('https:', document.location.protocol);

        setTimeout(() => {
            document.getElementById('ext-gen8').click();
        }, 1000)

        setTimeout(() => {
            [...document.querySelectorAll('#img-detail-panel .thumb-wrap .thumb div')].filter(
                (item, index) => item.innerText && item.innerText.search('([0-9]+ Photos)') === -1 && item.innerText.trim() === mailData.freePhotoAlbum
            )[0].click()
        }, 2000)

        setTimeout(() => {
            if (document.querySelector(`img[src="${mailData.freePhoto}"]`)) {
                document.querySelector(`img[src="${mailData.freePhoto}"]`).click()
                document.getElementById('ext-gen22').click()
            } else {
                document.getElementById('ext-gen37').click()
            }
        }, 3000)
    }
}

function sayHiError () {
    if (document.location.pathname === "/clagt/cupidnote/error_msg.php") {window.close()}
}
