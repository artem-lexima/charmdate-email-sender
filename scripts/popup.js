statusCheckbox = document.getElementById("status-checkbox");
emailingType = document.getElementById("emailing-type");
delayInput = document.getElementById('delay-input');

statusCheckbox.addEventListener('change', function() {
    chrome.storage.local.set({scriptIsActive: this.checked}, function() {});
});

emailingType.addEventListener('change', function() {
    chrome.storage.local.set({emailingType: this.value}, function() {});
});

delayInput.addEventListener('change', function() {
    chrome.storage.local.set({delay: this.value}, function() {});
});

document.addEventListener("DOMContentLoaded", function(){
    chrome.storage.local.get(['scriptIsActive', 'emailingType', 'delay'], function(result) {
          statusCheckbox.checked = result.scriptIsActive;

          if (result.emailingType) {
              emailingType.value = result.emailingType;
          } else {
              chrome.storage.local.set({emailingType: "First EMF Mail"}, function() {});
              emailingType.value = "First EMF Mail";
          }

          if (result.delay) {
              delayInput.value = result.delay;
          } else {
              chrome.storage.local.set({delay: 20}, function() {});
              delayInput.value = 20;
          }
    });
});
