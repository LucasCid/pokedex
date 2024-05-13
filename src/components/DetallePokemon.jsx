/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import './detalle.css'

function DetallePokemon({mostrar, pokemon, cerrar}){
    return(
        <div className='modal-container' onClick={cerrar} style={{display: mostrar ? 'grid' : 'none'}}>
            <section className='modal-body'>
                <div className='imagen-container'>
                    <img className='imagen-detalle' src={pokemon.imagen} alt={pokemon.nombre} />
                    <section>
                        {/* aca estoy mapeando el tipo de pokemon, entonces de pokemon, vamos a recuperar los tipos, vamos a mapearlo y por cada tipo vamos a generar un span, este span pinta el tipo correspondiente que tenga el arreglo, sea 1, sea 2 */}
                        {pokemon.types?.map(type => <span className='tag'>{type}</span>)}
                    </section>
                </div>
                <div className='data'>
                    <h2 className='titulo'>{pokemon.nombre} ({pokemon.id})</h2>

                    <h3 className='titulo-section'>Habilidades</h3>
                    {pokemon.abilities?.map(ability => <span className='tag'>{ability}</span>)}

                    <h3 className='titulo-section'>Estadisticas</h3>
                    <div className='stats'>
                    {pokemon.stats?.map(stat => //recorro la estadistica, y por cada una, creo una section, y por cada seccion 2 span, los puntajes de la estadistica y los nombres 
                    <section>
                        <span className='puntos'>{stat.base}</span>
                        <span>{stat.name}</span>
                    </section>
                    )}
                    </div>
                    
                </div>
            </section>
        </div>
    )
}

export default DetallePokemon