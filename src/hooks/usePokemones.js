/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/'

function usePokemones(){
    // estado que muestra por defecto los pokemones en pantalla
    const [pokemones, setPokemones] = useState([])
    const [siguienteUrl, setSiguienteUrl] = useState('')

    const fetchPokemon = async (url) => {
        const response = await fetch(url)
        const poke = await response.json()

        const abilities = poke.abilities.map(a => a.ability.name)
        const stats = poke.stats.map(s => {return {name: s.stat.name, base: s.base_stat}})
        const types = poke.types.map(t => t.type.name)

        return {
            id: poke.id,
            nombre: poke.name,
            imagen: poke.sprites.other.home.front_default,
            abilities,
            stats,
            types
        }
    }

    const getPokemones = async (url = URL_DEFAULT) => {
        // Recuperamos listado de pokemonmes
        const response = await fetch(url)
        const listaPokemones = await response.json()
        const { next, results } = listaPokemones

        // Por cada results, necesitamos obtener la informacion
         //Necesitamos esperar a que se resuelvan todas
        //por eso recurrimos a Promise.all
        const newPokemones = await Promise.all(
            results.map((pokemon) => fetchPokemon(pokemon.url) )
        )

        return {next, newPokemones}
    }

    const obternerPokemones = async () => {
        const {next, newPokemones} = await getPokemones()
        setPokemones(newPokemones)
        setSiguienteUrl(next)
    }

    const masPokemones = async () =>{
        const {next, newPokemones} = await getPokemones(siguienteUrl)
        setPokemones(prev => [...prev, ...newPokemones])
        setSiguienteUrl(next)
    }

    const searchPokemon = async (busqueda) => {
        const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`
        return await fetchPokemon(url)
    }

    useEffect(() => {obternerPokemones()}, [])

    return {pokemones, masPokemones, searchPokemon}
}

export default usePokemones