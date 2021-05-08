export interface ODataResponse<T> {
	count: number | null;
	nextPageLink: string | null;
	items: T;
}
