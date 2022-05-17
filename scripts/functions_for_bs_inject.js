function emfSender2() {
    let maleCountry = document.querySelector('td[width="183"] font').innerText.split('\n')[3];
    document.querySelector('form[name="form1"]').action = `emf_sender3.php?country=${maleCountry}`;

    document.querySelector('input[value="Next >>"]').click();
}

function emfSender3() {
    let maleCountry = (new URLSearchParams(document.location.search)).get('country');
    document.querySelector('form[name="form1"]').action = `emf_sender4.php?country=${maleCountry}`;

    document.querySelector('select[name="rmethod"]').value = '1';
    document.querySelector('textarea[name="lady_tel"]').value = document.querySelectorAll('td[bgcolor="#F9F9F9"]')[11].innerText.replace('  +', '')
    document.querySelector('input[value="Next"]').click()
}

function emfSender4(mailData) {
    let maleCountry = (new URLSearchParams(document.location.search)).get('country');
    let maleName = document.querySelector('td[width="95%"]').innerText.split('\n')[0].match('( [A-Za-z]{1,20} )')[0].trim();

    document.getElementById('TextArea1').value = mailData.messageText.replaceAll("{name}", maleName);

    if (!!maleCountry) {
        document.getElementById('TextArea1').value = document.getElementById('TextArea1').value.replaceAll("{country}", maleCountry)
    } else {
        document.getElementById('TextArea1').value = document.getElementById('TextArea1').value.replaceAll("{country}", "")
    }

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

    // Add video
    if (mailData.video) {
        mailData.video = mailData.video.replace('https:', document.location.protocol)

        setTimeout(() => {
            document.getElementById('ext-gen8').click()
        }, 14000)

        setTimeout(() => {
            [...document.querySelectorAll('#img-detail-panel2 .thumb-wrap .thumb div')].filter(
                    (item, index) => item.innerText && item.innerText.search('([0-9]+ Videos)') === -1 && mailData.videoAlbum.includes(item.innerText.replace("...", "").trim())
            )[0].click()
        }, 15000)

        setTimeout(() => {
            if (document.querySelector(`img[src="${mailData.video.replace(document.location.origin, '')}"]`)) {
                document.querySelector(`img[src="${mailData.video.replace(document.location.origin, '')}"]`).click()
                document.getElementById('ext-gen255').click()
            } else {
                document.getElementById('ext-gen263').click()
            }
        }, 17000)
    }
}

function emfError() {
    if (document.location.pathname === "/clagt/emf_error.php") {window.close()}
}
