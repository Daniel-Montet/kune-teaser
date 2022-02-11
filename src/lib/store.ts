import { json } from "body-parser";

export interface IStore {
	addUrl(originalUrl: string, shortUrl: string): boolean;
	findAllUrls(): any[] | undefined;
}


export default class Store implements IStore {
	constructor() {
		if (this.findAllUrls()) {
			localStorage.setItem("urls", JSON.stringify(this.findAllUrls()));
		}
	}

	findAllUrls() {
		let result = localStorage.getItem("urls")!;
		if (!result) {
			return undefined
		}
		return JSON.parse(result);
	}
	addUrl(originalUrl: string, shortUrl: string) {
		let input = { originalUrl, shortUrl };
		let arr = this.findAllUrls()
		if (!arr) {
			arr = [];
		}

		arr.push(input);
		let result = JSON.stringify(arr)
		localStorage.setItem("urls", result)
		return true;
	}

}
