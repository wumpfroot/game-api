export type gameTypes = {
	id: number;
	title: string;
	developer: string;
	metascore: number | typeof NaN;
};

export interface HttpError extends Error {
	status: number;
}
