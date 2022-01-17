import { useState, useEffect } from 'react';
import Link from 'next/link'

import AssetCard from './components/AssetCard.jsx'
import { fetch_assets, fetch_url_from_id, fetch_single_asset } from "./utils"

type asset_contract = {
  address: string,
}

type Asset = {
  id: string,
  name: string,
  description: string,
  image_url: string,
  asset_contract: asset_contract,
  token_id: string,
  address: string,
}


export default function Home() {
  const [ID, setID] = useState(74417323)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [asset, setAsset] = useState<Asset>({
    id: "",
    name: "",
    description: "",
    image_url: "",
    asset_contract: { "address": "" },
    token_id: "",
    address: "",
  })
  const [assets, setAssets] = useState<Asset[]>([])
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const [assetsSelection, setAssetsSelection] = useState<Asset[]>(assets)

  const getFromOpenSea = async () => {
    const url = await fetch_url_from_id(ID);
    const fetched_asset = await fetch_single_asset(url);
    console.log(fetched_asset);
    setAsset(fetched_asset)
  }

  const returnFilteredAssets = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.currentTarget.value
    const filtered_assets = assets.filter(asset => {
      return asset.name.toLowerCase().includes(term.toLowerCase())
    })
    if (term) { setAssetsSelection(filtered_assets) }
    else { setAssetsSelection(assets) }
  }

  const loadStoreWithAssets = async () => {
    setIsLoaded(false)
    const res = await fetch_assets()
    const data: Asset[] = res.assets
    const asset = data.map((data) => ({
      name: data.name,
      id: data.id,
      image_url: data.image_url,
      description: data.description,
      asset_contract: data.asset_contract,
      token_id: data.token_id,
      address: data.asset_contract.address + '/' + data.token_id
    }))
    setAssets([...assets, ...asset])
    setAssetsSelection([...assets, ...asset])
    console.log("Loaded assets to store: ", asset)
    setIsLoaded(true)
  }
  useEffect(() => {
    loadStoreWithAssets()
  }, [])

  {
    if (isLoaded) {
      console.log(assets[0])
      return (
        <div className="">
          <div className="flex gap-2">
            <h1>{searchTerm}</h1>
            <input
              className="w-full rounded-md text-lg p-4 border-2 border-gray-200"
              value={searchTerm}
              onChange ={(e) => {
                returnFilteredAssets(e)
                setSearchTerm(e.target.value)
              }}
              placeholder="Search Pokemon"
            />
            <input
              value={ID}
              onChange={(e) => setID(parseInt(e.target.value))}
              className="w-full rounded-md text-lg p-4 border-2 border-gray-200"
              type="number"
            />
          </div>
          <div className="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">

            {assetsSelection.map(asset => {
              return (
                <Link href="/profile/profile">
                <a className="list-none p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center"
                  href={""} >

                  <img className="h-40 w-40 " src={asset.image_url} alt="" />

                  <h2 className="uppercase text-2xl">{asset.name}</h2>

                  <p className="text-sm">{asset.token_id}</p>

                </a>
                </Link>
              )
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container">Loading</div>
      )
    }
  }
}


