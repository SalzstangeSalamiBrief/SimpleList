const addDialog = document.querySelector('dialog.add-dialog-container');
// const addForm = document.querySelector('.add-form');
const nameInput = <HTMLInputElement>document.querySelector('[name="add-dialog__name"');
const tagsInput = <HTMLInputElement>document.querySelector('[name="add-dialog__tags"');

// eslint-disable-next-line no-unused-vars
window.addEventListener('DOMContentLoaded', (e) => {
	// todo fetch data
	console.log('DOMContentLoaded');
});

document.querySelector('#open-add-dialog').addEventListener('click', () => {
	addDialog.classList.remove('is-hidden');
});

function resetForm() {
	nameInput.value = '';
	tagsInput.value = '';
}
// todo: if dialog is visible, set hidden if the user clicks outside of the dialog (in the gray area)
document.querySelector('button#cancel-adding').addEventListener('click', () => {
	addDialog.classList.add('is-hidden');
	resetForm();
});
