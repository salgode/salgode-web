import React, { useState, useEffect } from 'react'
import UpdateUserForm from '../../components/User/UpdateForm'
import { CircularProgress } from '@material-ui/core'
import { getObject, USER_DATA } from '../../utils/storeData'

const UpdateUser = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    const { name, lastName, phone } = getObject(USER_DATA)
    const data = {
      name: name,
      lastName: lastName,
      phone: phone,
    }
    setInitialValues(data)
    setIsLoading(false)
  }, [])

  if (isLoading) return <CircularProgress />

  return (
    <div className="columns has-margin-top-40">
      <div className="column">
        <UpdateUserForm initialValues={initialValues} />
      </div>
    </div>
  )
}

export default UpdateUser
