import { useContext, useState } from "react"
import{UserContext} from "../UserContext.jsx";
import{Navigate,Link, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx"; 
//? sempre importar as Paginas ('classes') que estao no projeto


export default function AccountPage(){
    const {ready,setUser,user}=useContext(UserContext);  
    const [redirect,setRedirect] = useState(null);

    let {subpage}= useParams();
    if (subpage === undefined){
    subpage = 'profile';
   }
   //console.log(subpage);   

  async function logout(){
    await axios.post('/logout'); 
    setUser(null);
    setRedirect('/');
   }


    if(!ready){  console.log(ready);
         console.log('user:',user)
         console.log('ready?',ready)
        return 'Loading...'
    }

    if(ready && !user && !redirect){
        console.log('ready?',ready)
            return <Navigate to ={'/login'}/>
        } 
 

function linkClasses(type=null){
 let classes = 'inline-flex py-2 px-6';
 if (type === subpage){
    classes += ' bg-primary text-white rounded-full ';
 }
 return classes;
}

    if (redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className={linkClasses('profile')} to={'/account'}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    My profile 
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                     My bookings 
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg> 
                    My accommodations
                </Link>
            </nav>
            {subpage === 'profile' &&(
                <div className = 'text-center max-w-lg mx-auto'>
                logged in as {user.name} ({user.email})
                <button onClick={logout} className="primary max-w-sm mt-2">Logout </button>

                </div>
                //!  chama uma api andPonit e reset Cookie
            )}
            {subpage === 'places' && (
                <PlacesPage/>
                )}
        </div>    
    );
}
