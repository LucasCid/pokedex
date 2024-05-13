import { Logo } from "./Icons"
import './Navbar.css'

const Navbar = () =>{
    return(
        <nav>
           <Logo />
           <h3>Mas de 800 Pokemones, elige tu favorito!</h3>
           <div className="switch">
            
            <label>
            <img src="../public/Pokeball.png" alt="" />
                <span></span>
            </label>
           </div>
        </nav>
    )
}

export default Navbar