import Snackbar from 'snackbar-js';
export function showMessage(msg) {
  Snackbar
    .create()
    .setText(msg)
    .setStyle('center') // or you can use .setStyle('left')
    .show();
}