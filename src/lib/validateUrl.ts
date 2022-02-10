import Joi from "joi";

export function joiValidateUrl(url: string) {
	const schema = Joi.string().domain({
		tlds: { allow: ["com", "dev", "co", "org"] },
	});

	const { value, error } = schema.validate(url);
	return { value, error };
}

export async function validateUrl(url: string) {
	let myUrl = await toTry(new URL(url));
	if (myUrl.error) {
		return {
			error: myUrl.error,
			value: myUrl.value
		}
	}

	let host = myUrl.value.host;
	let pathname = myUrl.value.pathname;

	let { value, error } = joiValidateUrl(host)
	if (error) {
		return { error, value }
	}

	return { value: host + pathname, error }

}

function toTry(action: any): Promise<{ value: any | null, error: any | null }> {
	return new Promise((resolve, reject) => {
		try {
			resolve({ value: action(), error: null })
		} catch (error) {
			reject({ value: null, error })
		}
	})
}