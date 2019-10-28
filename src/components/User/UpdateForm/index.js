import React, { useEffect, useState, useRef } from 'react'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserThunk } from '../../../redux/actions/updateUser'
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import uploadFile from '../../../utils/uploadFile'

const UpdateForm = () => {
  const uploadAvatar = useRef()
  const uploadDniFront = useRef()
  const uploadDniBack = useRef()

  const [isLoading, setIsLoading] = useState(true)
  const [hasCar, setHasCar] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const updateUserState = useSelector(state => state.updateUser)

  if (isLoading) return 'Loading..'

  const uploadAllImages = async () => {
    const images = {}

    if (uploadAvatar.current.files.length !== 0) {
      await uploadFile(uploadAvatar).then(res => {
        images.avatar = res.image_urls.fetch
      })
    }
    if (uploadDniFront.current.files.length !== 0) {
      await uploadFile(uploadDniFront).then(res => {
        images.dniFront = res.image_urls.fetch
      })
    }
    if (uploadDniBack.current.files.length !== 0) {
      await uploadFile(uploadDniBack).then(res => {
        images.dniBack = res.image_urls.fetch
      })
    }

    return images
  }

  const updateUser = async e => {
    e.preventDefault()
    uploadAllImages().then(res => {
      dispatch(updateUserThunk(res))
    })
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
            name="phone"
            component={renderTextField}
            type="text"
            label="Numero telefonico"
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="Avatar">Selfie</label>
        <div className="control">
          <input ref={uploadAvatar} id="file-upload-avatar" type="file" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="Avatar">Cedula frontal</label>
        <div className="control">
          <input ref={uploadDniFront} id="file-upload-avatar" type="file" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="Avatar">Cedula posterior</label>
        <div className="control">
          <input ref={uploadDniBack} id="file-upload-avatar" type="file" />
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
            <div>
              {/* <h1 className="subtitle has-text-primary">
                Perfil actualizado con exito !
              </h1> */}
              <Redirect to="/profile" />
            </div>
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
})(UpdateForm)
