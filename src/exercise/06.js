// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {PokemonDataView, PokemonForm, PokemonInfoFallback, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (!pokemonName) return;
    setError(null)
    setPokemon(null);
    fetchPokemon(pokemonName).then(
      pokemonData => setPokemon(pokemonData)
    ).catch(error => setError(error))
  }, [pokemonName])
  if (error) return <ErrorView error={error} />
  if (!pokemonName) return 'Submit a pokemon'
  if (!pokemon) return <PokemonInfoFallback name={pokemonName} />
  return <PokemonDataView pokemon={pokemon} />
}

function ErrorView({error}) {
  return (
    <>
      <div className="pokemon-info__img-wrapper">
        <img src="https://pm1.aminoapps.com/6448/abef6f8bc30b53eae71a2a7d495ab1b5c9e9c025_hq.jpg" alt="sad Psyduck" />
      </div>
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    </>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
