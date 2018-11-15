export interface Content {
	title?: string;
	subtitle?: string;
	background?: string;
}

export interface Contents extends Array<Content> {}
