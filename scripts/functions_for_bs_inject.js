function emfSender2() {
    document.querySelector('input[value="Next >>"]').click();
}

function emfSender3() {
    document.querySelector('select[name="rmethod"]').value = '1';
    document.querySelector('textarea[name="lady_tel"]').value = document.querySelectorAll('td[bgcolor="#F9F9F9"]')[11].innerText.replace('  +', '')
    document.querySelector('input[value="Next"]').click()
}

function emfSender4(mailData) {
    let maleName = document.querySelector('td[width="95%"]').innerText.split('\n')[0].match('( [A-Za-z]{1,20} )')[0].trim();

    document.getElementById('TextArea1').value = mailData.messageText.replace("{{MALE_NAME}}", maleName);

    // Add Free Photo
    if (mailData.freePhoto) {
        mailData.freePhoto = mailData.freePhoto.replace('https:', document.location.protocol)

        setTimeout(() => {
            document.getElementById('ext-gen15').click();
        }, 1000)

        setTimeout(() => {
            [...document.querySelectorAll('#img-detail-panel .thumb-wrap .thumb div')].filter(
                (item, index) => item.innerText && item.innerText.search('([0-9]+ Photos)') === -1 && item.innerText.trim() === mailData.freePhotoAlbum
            )[0].click()
        }, 1500)

        setTimeout(() => {
            if (document.querySelector(`img[src="${mailData.freePhoto}"]`)) {
                document.querySelector(`img[src="${mailData.freePhoto}"]`).click()
                document.getElementById('ext-gen36').click()
            } else {
                document.getElementById('ext-gen44').click()
            }
        }, 2000)
    }

    // Add Privat Photos
    if (mailData.privatPhotos.length !== 0 && mailData.freePhoto) {
        for (let index = 0; index < mailData.privatPhotos.length; index++) {
            let privatPhoto = mailData.privatPhotos[index].replace('https:', document.location.protocol)
            let privatPhotoAlbum = mailData.privatPhotoAlbums[index]

            setTimeout(() => {document.getElementById('ext-gen22').click()}, 3000*(index+1))

            setTimeout(() => {
                [...document.querySelectorAll('#img-detail-panel1 .thumb-wrap .thumb div')].filter(
                    (item, index) => item.innerText && item.innerText.search('([0-9]+ Photos)') === -1 && item.innerText.trim() === privatPhotoAlbum
                )[0].click()
            }, 3500*(index+1))

            setTimeout(() => {
                if (document.querySelector(`img[src="${privatPhoto}"]`)) {
                    document.querySelector(`img[src="${privatPhoto}"]`).click()
                    document.getElementById('ext-gen139').click()
                } else {
                    document.getElementById('ext-gen147').click()
                }
            }, 4000*(index+1))
        }
    }
}

function emfError() {
    if (document.location.pathname === "/clagt/emf_error.php") {window.close()}
}
