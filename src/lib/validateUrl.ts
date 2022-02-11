import Joi, { ValidationError } from "joi";
import validator from "validator";
// import crypto from "crypto"


export function validateUrl(url: string): boolean {
	return validator.isURL(url);
}




export async function customValidateUrl(url: string) {
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
 * @param domain 
 * @returns Object<{ value: string , error: Joi.ValidationError | undefined }>
  *  - validates domain against pre-set allowed tlds
 */
export function joiValidateUrl(domain: string): { value: string, error: ValidationError | undefined } {
	const schema = Joi.string().domain({
		tlds: { allow: true },
	});

	const { value, error } = schema.validate(domain);
	return { value, error };
}





/**
 * 
 * @param url 
 * @returns shortened url
 */
export async function generateShortUrl(url: string): Promise<string> {
	// const encryptedUrl = crypto.randomBytes(8).toString("hex");
	const encryptedUrl = random(8);
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