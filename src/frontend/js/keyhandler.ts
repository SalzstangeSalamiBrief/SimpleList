const addDialog = document.querySelector('.add-dialog-container');
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

document.querySelector('button#cancel-adding').addEventListener('click', () => {
	console.log('click canscel');
	addDialog.classList.add('is-hidden');
	resetForm();
});
