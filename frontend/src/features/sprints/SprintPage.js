import React from 'react'
import { Link } from 'react-router-dom'

import { Spinner } from '../../components/Spinner'
import { useGetSprintQuery } from '../api/apiSlice'
import { CardsList } from '../cards/CardList'
import { AddCardForm } from '../cards/AddCardForm'

// import { SprintAuthor } from './SprintAuthor'
// import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'

export const SprintPage = ({ match }) => {
  const { sprintId } = match.params

  const { data: sprint, isFetching, isSuccess } = useGetSprintQuery(sprintId)

  let content
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    content = (
      <article className="sprint">
        <h2>Sprint: {sprint.name}</h2>
        <AddCardForm sprintId={sprint._id}/>
        <CardsList cards={sprint.cards} />
      </article>
    )
  }

  return <section>{content}</section>
}
