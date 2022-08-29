import React from 'react'
import { Link } from 'react-router-dom'

export const CardsList = (cards) => {

  const startCards = Object.keys(cards)
    .filter((card) => card.category === "Start")
    .map((card) => (
      <li>{card.name}</li>
    ))

  const continueCards = Object.keys(cards)
    .filter((card) => card.category === "Stop")
    .map((card) => (
      <li>{card.name}</li>
    ))

  const stopCards = Object.keys(cards)
    .filter((card) => card.category === "Continue")
    .map((card) => (
      <li>{card.name}</li>
    ))

  return (
    <section>
      <h2>Cards</h2>

      <h3>Start</h3>
      <ul>{startCards}</ul>

      <h3>Continue</h3>
      <ul>{continueCards}</ul>

      Stop
      <ul>{stopCards}</ul>
    </section>
  )
}
