import { useRouter } from 'next/router'

const Profile = () => {
    const router = useRouter()
    const { id } = router.query
    const asset = {
        id: id,
        name: 'Jack',
        description: 'A great guy',
    }
    return (
        <div className="flex flex-col items-center">

            <h1 className="text-4xl text-center my-8 uppercase">{asset.name}</h1>
            <p>Description: <strong>{asset.description}</strong> | Id: <strong>{asset.id}</strong>
                |
            </p>
            <img className="card-image" src={asset.image_url}
                alt={asset.name}
            />
        </div>
    )
}

export default Profile