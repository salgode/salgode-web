import React from 'react'
import UpdateUserForm from '../../components/User/UpdateForm'
const UpdateUser = () => {
  return (
    <div className="columns has-margin-top-40">
      <div className="column">
        {/* Estos datos 'usr_12345' son de prueba */}
        {/* Tenemos que enviarle la id del usuario que esta logeado, o todos los datos de este. */}
        <UpdateUserForm user_id={'usr_12345'} />
      </div>
    </div>
  )
}

export default UpdateUser
