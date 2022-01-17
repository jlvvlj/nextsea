
export default function AssetCard (props) {
    return (
        <a class="list-none p-6 bg-gray-100 text-gray-800 text-center rounded-md shadow-sm hover:shadow-md flex flex-col items-center" 
            href={""} >
            
            <img class="h-40 w-40 " src={props.asset.image_url} alt=""/>
            
            <h2 class="uppercase text-2xl"> {props.name}</h2>
            
            <p class="text-sm">{props.asset.id}</p>
        
        </a>
    )
}

