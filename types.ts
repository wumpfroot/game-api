export type gameTypes = {
	id: number;
	title: string;
	developer: string;
	metascore: number | typeof NaN;
	platforms: string[];
	releaseDate: string;
	isEarlyAccess: boolean;
};

export interface HttpError extends Error {
	status: number;
}
