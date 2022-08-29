import React from 'react'

import { useAddReactionMutation } from '../api/apiSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButtons = ({ sprint }) => {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([reactionName, emoji]) => {
      return (
        <button
          key={reactionName}
          type="button"
          className="muted-button reaction-button"
          onClick={() => {
            addReaction({ sprintId: sprint.id, reaction: reactionName })
          }}
        >
          {emoji} {sprint.reactions[reactionName]}
        </button>
      )
    }
  )

  return <div>{reactionButtons}</div>
}
