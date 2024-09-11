import { Link, useParams } from "react-router-dom";
export default function PlacesPage() {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gab-1  bg-primary text-white py-2 px-6 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 24 24"strokeWidth={1.5}stroke="currentColor"className="size-6"
            >
              <path
                strokeLinecap="round"strokeLinejoin="round"d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === 'new' &&(
        <div>
            <form>
                <h2 className="text-xl mt-4">Title</h2>
                <p className='text-gray-500'>Title for your place. should be short and catchy as in advertisement</p>
                <input type='text' placeholder='title, for example: My lovely apt'/>
                <h2 className="text-xl mt-4">Address</h2>
                <input type='text' placeholder="address"/>
                <h2 className="text-xl mt-4">Photos</h2>


            </form>
        </div>
      )}
    </div>
  );
}
//?retorna um new (obj)action pq foi definido em app.jsx, que tera uma action neste url que
//?nesta pagina a action usa um metodo de parametro, retorna NEW pois é oq foi definido no url</div>
