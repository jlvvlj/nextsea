export const fetch_assets = async () => {
	const url = `https://api.opensea.io/api/v1/assets?collection=doodles-official&order_direction=desc&offset=0&limit=20`;
	const res = await fetch(url)
	const data = await res.json()
	console.log("Fetched assets", data)
	return data
}


export async function fetch_single_asset(url) {
	const res = await fetch(url);
	const single_asset = await res.json();
	return single_asset;
} 


export async function get_url_from_id(id) {
	const asset = pokemonDetails.find(asset => asset.id === parseInt(id))
	const address = asset.address
	const url = `https://api.opensea.io/api/v1/asset/${address}`
	return url
}

export async function fetch_url_from_id(id) {
	const data = await fetch_assets()
	const asset = data.assets.find((asset) => asset.id == id);
	const address = asset.asset_contract.address + '/' + asset.id;
	const url = `https://api.opensea.io/api/v1/asset/${address}`
	console.log(url)
	return url
}