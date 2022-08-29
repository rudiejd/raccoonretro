import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from '../../components/Spinner'
import { useAddCardMutation } from '../api/apiSlice'
// import { selectAllUsers } from '../cards/usersSlice'

export const AddCardForm = (sprintId) => {
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('')

  const [addNewCard, { isLoading }] = useAddCardMutation()
  // const users = useSelector(selectAllUsers)

  const onDescChanged = (e) => setDesc(e.target.value)
  const onCategoryChanged = (e) => setCategory(e.target.value)

  const canSave = [desc, category].every(Boolean) && !isLoading

  const onSaveCardClicked = async () => {
    if (canSave) {
      try {
        const card = {desc: desc, category: category};
        await addNewCard({sprintId: sprintId, card: card}).unwrap()
        setDesc('')
        setCategory('')
      } catch (err) {
        console.error('Failed to save the card: ', err)
      }
    }
  }

  // const usersOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.desc}
  //   </option>
  // ))

  const spinner = isLoading ? <Spinner size="30px" /> : null

  return (
    <section>
      <h2>Add a New Card</h2>
      <form>
        <label htmlFor="cardDesc">Card Desc:</label>
        <input
          type="text"
          id="cardDesc"
          desc="cardDesc"
          placeholder="Cardy Mc Cardface"
          value={desc}
          onChange={onDescChanged}
        />
        <label htmlFor="cardCategory">Category:</label>
        <select id="cardCategory" value={category} onChange={onCategoryChanged}>
          <option value="Start">Start</option>
          <option value="Continue">Stop</option>
          <option value="Stop">Continue</option>
        </select>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button type="button" onClick={onSaveCardClicked} disabled={!canSave}>
            Save Card
          </button>
          {spinner}
        </div>
      </form>
    </section>
  )
}
