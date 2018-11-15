export interface Content {
	image: string;
	title: string;
	subtitle: string;
}

export interface Contents extends Array<Content> {}
