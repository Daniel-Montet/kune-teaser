import { IStore } from "./store";


export type AppProps = {
	url?: string;
	setUrl?: Function;
	header?: JSX.Element;
	main?: JSX.Element;
	store?: IStore;
	isLoading?: boolean,
	isError?: boolean
};
