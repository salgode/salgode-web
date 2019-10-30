import React, { useState, useEffect } from 'react'
import UpdateUserForm from '../../components/User/UpdateForm'
import Loading from '../../components/Loading/Loading'
import { getObject, USER_DATA } from '../../utils/storeData'

const UpdateUser = () => {
  const [isLoading, setIsLoading] = useState(true)

  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    // const alldata = getObject(USER_DATA)
    const { name, lastName, phone } = getObject(USER_DATA)
    const data = {
      name: name,
      lastName: lastName,
      phone: phone,
    }
    // console.log(alldata)
    setInitialValues(data)
    setIsLoading(false)
  }, [])

  if (isLoading) return <Loading />

  return (
    <div className="columns has-margin-top-40">
      <div className="column">
        <UpdateUserForm initialValues={initialValues} />
      </div>
    </div>
  )
}

export default UpdateUser
