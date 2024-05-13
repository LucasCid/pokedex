/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import './pokemones.css'
import usePokemones from '../hooks/usePokemones'
import DetallePokemon from './DetallePokemon'
import Buscador from './Buscador'
import { useState } from 'react'


function Pokemon({ id, nombre, imagen, verPokemon }) {
    return (
        <div className='pokemon-card' onClick={verPokemon}>
            <img src={imagen} alt={nombre} className='pokemon-imagen' />
            <p className='pokemon-titulo'>
                <span>#{id}</span>
                <span>{nombre}</span>
            </p>
        </div>
    )
}

function Pokemones() {
    const { pokemones, masPokemones, searchPokemon } = usePokemones()
    const [mostrar, setMostrar] = useState({mostrar:false, pokemon: {}})
    const [busqueda, setBusqueda] = useState('')

    const verPokemon = (pokemon) => setMostrar({mostrar: true, pokemon})

    const noVerPokemon = () => {
        setMostrar({mostrar: false, pokemon: {}})
        setBusqueda('')
    }

    const buscarPokemon = async (e) =>{
        e.preventDefault()
        if(!busqueda) return
        const pokemon = await searchPokemon(busqueda)

        setMostrar({mostrar : true, pokemon})
    }

    return (
        <>
            <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
            <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon} />
            <section className='pokemon-container'>

                {/* aca estoy recorriendo el arreglo de nuestros pokemones y lo manda a generar las tarjetas, para cada pokemon */}
                {pokemones.map(pokemon => <Pokemon {...pokemon} key={pokemon.id} verPokemon={() => verPokemon(pokemon)} />)}
                <button className='btn-buscar' onClick={masPokemones}>Mostrar mas pokemones</button>
            </section>
        </>
    )
}

export default Pokemones