// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import { ErrorBoundary } from "react-error-boundary";
import {PokemonDataView, PokemonForm, PokemonInfoFallback, fetchPokemon} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null
  })
  const {status, pokemon, error} = state;

  React.useEffect(() => {
    if (!pokemonName) return;
    setState(pokemon => ({...pokemon, status: 'pending'}))
    fetchPokemon(pokemonName).then(
      pokemonData => {
        setState({status: 'resolved', pokemon: pokemonData})
      }
    ).catch(error => {
      setState(pokemon => ({...pokemon, status: 'rejected', error: error}))
    })
  }, [pokemonName])

  const isIdle = status === 'idle'
  const isPending = status === 'pending'
  const isResolved = status === 'resolved'
  const isRejected = status === 'rejected'
  if (isIdle) return 'Submit a pokemon'
  if (isPending) return <PokemonInfoFallback name={pokemonName} />
  if (isRejected) throw error;
  if (isResolved) return <PokemonDataView pokemon={pokemon} />
}

function FallbackComponent({error, resetErrorBoundary}) {
  return (
    <>
      <div className="pokemon-info__img-wrapper">
        <img src="https://pm1.aminoapps.com/6448/abef6f8bc30b53eae71a2a7d495ab1b5c9e9c025_hq.jpg" alt="sad Psyduck" />
      </div>
      <div role="alert">
        There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
      <button onClick={resetErrorBoundary}>try again</button>
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
        <ErrorBoundary FallbackComponent={FallbackComponent} resetKeys={[pokemonName]} onReset={() => {
            setPokemonName('');
        }}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
