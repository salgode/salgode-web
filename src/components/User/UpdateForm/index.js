import React, { useEffect, useState, useRef } from 'react'
import { Field, reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserThunk } from '../../../redux/actions/updateUser'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const testInfo = {
  user: {
    firstName: 'John',
    email: 'email@email.com',
    lastName: 'Doe',
    phone: 56900000000,
  },
  car: {
    plate: 'HS9201',
    color: 'White',
    brand: 'Toyota',
    model: 'Yaris',
  },
}

const UpdateForm = ({ user_id }) => {
  const uploadAvatarInput = useRef()

  const [isLoading, setIsLoading] = useState(true)
  const [hasCar, setHasCar] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const updateUserState = useSelector(state => state.updateUser)

  if (isLoading) return 'Loading..'

  const updateUser = e => {
    e.preventDefault()
    dispatch(updateUserThunk(user_id))
  }

  const tengoAuto = () => {
    if (hasCar) {
      setHasCar(false)
    } else {
      setHasCar(true)
    }
  }

  // eslint-disable-next-line react/prop-types
  const renderTextField = ({ input, label, ...custom }) => (
    <TextField
      variant="outlined"
      margin="normal"
      label={label}
      fullWidth
      {...input}
      {...custom}
    />
  )

  return (
    <form>
      <Typography component="h1" variant="h4">
        Datos del usuario
      </Typography>
      <div className="field">
        <div className="control">
          <Field
            name="name"
            component={renderTextField}
            type="text"
            label="Nombre"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <Field
            name="lastName"
            component={renderTextField}
            type="text"
            label="Apellido"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <Field
            name="email"
            component={renderTextField}
            type="text"
            label="Email"
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <Field
            name="phone"
            component={renderTextField}
            type="text"
            label="Numero telefonico"
          />
        </div>
      </div>

      <div className="field">
        <div className="control">
          <span className="file has-name">
            <label className="file-label">
              <input
                ref={uploadAvatarInput}
                className="file-input"
                type="file"
                name="resume"
                disabled
              />
              <span className="file-cta">
                <span className="file-icon has-margin-right-10">
                  <i className="material-icons">cloud_upload</i>
                </span>
                <span className="file-label">Actualizar Avatar</span>
              </span>
              {/* <span className="file-name">Screen Shot 2017-07-29 at 15.54.25.png</span> */}
            </label>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="checkbox">
          <input type="checkbox" onClick={() => tengoAuto()} />
          Tengo auto
        </label>
      </div>

      {hasCar && (
        <>
          <div className="field">
            <div className="control">
              <Field
                name="plate"
                component={renderTextField}
                type="text"
                label="Patente"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Field
                name="color"
                component={renderTextField}
                type="text"
                label="Color"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <Field
                name="brand"
                component={renderTextField}
                type="text"
                label="Marca"
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <Field
                name="model"
                component={renderTextField}
                type="text"
                label="Modelo"
              />
            </div>
          </div>
        </>
      )}

      <button
        className={`button is-link ${updateUserState.loading && 'is-loading'}`}
        onClick={e => updateUser(e)}
      >
        {updateUserState.loading ? 'Loading' : 'Actualizar'}
      </button>

      <div className="field has-margin-top-40">
        <div className="control">
          {updateUserState.loading && (
            <h1 className="subtitle has-text-primary">
              Estamos actualizando tu perfil..
            </h1>
          )}

          {updateUserState.success && (
            <h1 className="subtitle has-text-primary">
              Perfil actualizado con exito !
            </h1>
          )}

          {/* 
            // No se con que key devuelven el error, posiblemente err, error, o message, pero para que no de error luego lo cambiamos
            {updateUserState.error && (
            <h1 className="subtitle has-text-primary">
              {updateUserState.error}
            </h1>
            )}
            
            */}
        </div>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'updateUser',
  initialValues: {
    name: testInfo.user.firstName,
    email: testInfo.user.email,
    lastName: testInfo.user.lastName,
    phone: testInfo.user.phone,
    plate: testInfo.car.plate,
    color: testInfo.car.color,
    brand: testInfo.car.brand,
    model: testInfo.car.model,
  },
})(UpdateForm)

UpdateForm.propTypes = {
  user_id: PropTypes.string.isRequired,
}
