/* Editor: Johnson Gao
 * Date This Project Created:2020-1-12
 * Description Of This Class:For webapp installiation, prompt user to install my app.
 */

//window for installation, prompt user to install my app.
let deferredInstallPrompt = null;
//const INSTALL_TAB = document.getElementById('downloadTab');
//console.log(typeof INSTALL_TAB);
//add listener
//INSTALL_TAB.addEventListener('click', installPWA);


window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *Avoid delay
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
deferredInstallPrompt = evt;
document.getElementById('downloadTab').classList.toggle('hide');
console.log("sbip");
}

/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
document.getElementById('downloadTab').classList.toggle('hide');

deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
}

window.addEventListener('appinstalled', logAppInstalled);

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  // CODELAB: Add code to log the event
// CODELAB: Add code to log the event
console.log('App was installed.', evt);
}
