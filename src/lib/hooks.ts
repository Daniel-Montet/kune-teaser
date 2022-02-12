import { useEffect, useState } from "react";
import { validateUrl } from "./validateUrl";

const useShortUrlsApi = (endpoint: string): [
	state: {
		data: {
			originalUrl: string,
			shortUrl: string
		}, isLoading: boolean, isError: boolean
	},
	callbacks: {
		setUrl: Function,
		setData: Function,
		setIsError: Function
	}] => {
	const [url, setUrl] = useState("");
	const [data, setData] = useState({ originalUrl: '', shortUrl: '' });
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);


	useEffect(() => {
		const dofetch = async () => {
			const isValid = await validateUrl(url);
			if (!isValid) {
				setIsError(true);
			}

			console.log("called doFetch", url)
			// url signature valid ,it's safe to fetch now at this point
			await fetch(endpoint, {
				method: "POST",
				mode: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url: url }),
			})
				.then(async (response) => {
					let result: { url: string | null, error: string | null } = await response.json()
					setIsLoading(true);
					setIsError(false);
					setData({ originalUrl: url, shortUrl: result.url! });
				})
				.catch((error) => {
					setIsLoading(false);
					setData({ originalUrl: '', shortUrl: '' })
					setIsError(true);
					console.log(error);
				});
		}

		// useEffect runs during componentDidMount and will call dofetch and cause a bug,
		// hence we have to conditionally call it by checking if the url is set.
		if (url) {
			dofetch()
		}
	}, [url])
	return [{ data, isLoading, isError }, { setUrl, setData, setIsError }];
};

export default useShortUrlsApi