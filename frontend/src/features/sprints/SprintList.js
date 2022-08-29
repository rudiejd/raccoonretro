import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'

import { Spinner } from '../../components/Spinner'
// import { SprintAuthor } from './SprintAuthor'
// import { TimeAgo } from './TimeAgo'
// import { ReactionButtons } from './ReactionButtons'

import { useGetSprintsQuery } from '../api/apiSlice'

let SprintExcerpt = ({ sprint }) => {
  return (
    <article className="sprint-excerpt" key={sprint._id}>
    <Link to={`/sprints/${sprint._id}`}><h3>{sprint.name}</h3></Link>  
      <div>
        {/* <SprintAuthor userId={sprint.user} /> */}
        {/* <TimeAgo timestamp={sprint.date} /> */}
      </div>

      {/* <ReactionButtons sprint={sprint} /> */}
    </article>
  )
}

export const SprintsList = () => {
  const {
    data: sprints = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetSprintsQuery()

  // const sortedSprints = useMemo(() => {
  //   const sortedSprints = sprints.slice()
  //   sortedSprints.sort((a, b) => b.date.localeCompare(a.date))
  //   return sortedSprints
  // }, [sprints])

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    const renderedSprints = sprints.map((sprint) => (
      <SprintExcerpt key={sprint._id} sprint={sprint} />
    ))

    const containerClassname = classnames('sprints-container', {
      disabled: isFetching,
    })

    content = <div className={containerClassname}>{renderedSprints}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="sprints-list">
      <h2>Sprints</h2>
      {content}
    </section>
  )
}
