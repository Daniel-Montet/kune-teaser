import Joi, { ValidationError } from "joi";
import crypto from "crypto"

/**
 * 
 * @param domain 
 * @returns Object<{ value: string , error: Joi.ValidationError | undefined }>
  *  - validates domain against pre-set allowed tlds
 */
export function joiValidateUrl(domain: string): { value: string, error: ValidationError | undefined } {
	const schema = Joi.string().domain({
		tlds: { allow: ["com", "dev", "co", "org"] },
	});

	const { value, error } = schema.validate(domain);
	return { value, error };
}


export async function validateUrl(url: string) {
	// check if url meets rfc:1738 standard format
	// https://datatracker.ietf.org/doc/html/rfc1738 
	let myUrl;
	try {
		myUrl = new URL(url);
	} catch (error) {
		console.log("first checkpoint", error);
		return {
			error: error,
			value: undefined
		}
	}

	// check if domain is valid
	let host = myUrl.host;
	let pathname = myUrl.pathname;

	let { value, error } = joiValidateUrl(host)
	if (error) {
		console.log("second checkpoint", error)
		return { error, value }
	}

	return { value: host + pathname, error }

}

/**
 * 
 * @param url 
 * @returns shortened url
 */
export async function generateShortUrl(url: string): Promise<string> {
	const encryptedUrl = crypto.randomBytes(5).toString("hex");
	// const encryptedUrl = random(8);
	return `kune.ly/${encryptedUrl}`
}

const random = (length = 8) => {
	// Declare all characters
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	// Pick characters randomly
	let str = '';
	for (let i = 0; i < length; i++) {
		str += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return str;

};