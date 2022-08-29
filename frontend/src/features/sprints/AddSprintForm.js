import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { Spinner } from '../../components/Spinner'
import { useAddNewSprintMutation } from '../api/apiSlice'
// import { selectAllUsers } from '../cards/usersSlice'

export const AddSprintForm = () => {
  const [name, setName] = useState('')
  const [addNewSprint, { isLoading }] = useAddNewSprintMutation()
  // const users = useSelector(selectAllUsers)

  const onNameChanged = (e) => setName(e.target.value)

  const canSave = [name].every(Boolean) && !isLoading

  const onSaveSprintClicked = async () => {
    if (canSave) {
      try {
        await addNewSprint({ name }).unwrap()
        setName('')
      } catch (err) {
        console.error('Failed to save the sprint: ', err)
      }
    }
  }

  // const usersOptions = users.map((user) => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ))

  const spinner = isLoading ? <Spinner size="30px" /> : null

  return (
    <section>
      <h2>Add a New Sprint</h2>
      <form>
        <label htmlFor="sprintName">Sprint Name:</label>
        <input
          type="text"
          id="sprintName"
          name="sprintName"
          placeholder="Sprinty Mc Sprintface"
          value={name}
          onChange={onNameChanged}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <button type="button" onClick={onSaveSprintClicked} disabled={!canSave}>
            Save Sprint
          </button>
          {spinner}
        </div>
      </form>
    </section>
  )
}
