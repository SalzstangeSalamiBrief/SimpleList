class Validator {
	public validateName(nameToValidate = ''): boolean {
		return (
			typeof nameToValidate === 'string'
      && /^[A-Za-z0-9]{5,}$/.test(nameToValidate)
		);
	}

	public validateTagsArray(tagsToValidate: Array<string> = []): boolean {
		if (!Array.isArray(tagsToValidate)) {
			return false;
		}
		const tagsToValidateLength = tagsToValidate.length;
		let isValidArray = false;
		if (tagsToValidateLength > 0) {
			isValidArray = true;
			for (let i = 0; i < tagsToValidateLength; i += 1) {
				const isTagValid = typeof tagsToValidate[i] === 'string'
				&& /^[A-Za-z0-9]{2,}$/.test(tagsToValidate[i].trim());
				isValidArray = isValidArray && isTagValid;
			}
		}
		return isValidArray;
	}
}

export default new Validator();
