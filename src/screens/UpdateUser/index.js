import React from 'react'
import UpdateUserForm from '../../components/User/UpdateForm'

const UpdateUser = () => {
  return (
    <div className="columns has-margin-top-40">
      <div className="column">
        <h1 className="title is-2"> Tus datos </h1>
        {/* Estos datos 'usr_12345' son de prueba */}
        <UpdateUserForm user_id={'usr_12345'} />
      </div>
    </div>
  )
}

export default UpdateUser
