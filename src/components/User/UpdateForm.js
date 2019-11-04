import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Switch, FormControlLabel } from '@material-ui/core'
import { FormField, FileField } from './'

const UpdateForm = React.forwardRef((props, ref) => {
  const {
    uploadAvatar,
    uploadDniFront,
    uploadDniBack,
    uploadDriFront,
    uploadDriBack,
  } = ref
  return (
    <>
      <Grid item xs={12}>
        <Typography component="h1" variant="h4">
          Datos del usuario
        </Typography>
      </Grid>
      <FormField
        focus
        label="Nombre"
        value={props.name}
        onChange={props.onChangeName}
      />
      <FormField
        label="Apellido"
        value={props.lastName}
        onChange={props.onChangeLastName}
      />
      <FormField
        label="Número de Teléfono"
        value={props.phone}
        onChange={props.onChangePhoneNumber}
      />
      <FileField label="Selfie" ref={uploadAvatar} />
      <FileField label="Cédula Frontal" ref={uploadDniFront} />
      <FileField label="Cédula Posterior" ref={uploadDniBack} />
      <FileField label="Licencia Frontal" ref={uploadDriFront} />
      <FileField label="Licencia Posterior" ref={uploadDriBack} />
      <Grid item xs={4}>
        <FormControlLabel
          control={
            <Switch
              checked={props.hasVehicle}
              onChange={props.onChangeHasVehicle}
            />
          }
          label="Tengo Vehículo"
        />
      </Grid>
      {!props.hasVehicle ? null : (
        <>
          <Grid item xs={12}>
            <Typography component="h1" variant="h4">
              Datos del vehículo
            </Typography>
          </Grid>
          <FormField
            label="Alias"
            value={props.alias}
            onChange={props.onChangeAlias}
          />
          <FormField
            label="Marca"
            value={props.brand}
            onChange={props.onChangeBrand}
          />
          <FormField
            label="Modelo"
            value={props.model}
            onChange={props.onChangeModel}
          />
          <FormField
            label="Alias"
            value={props.color}
            onChange={props.onChangeColor}
          />
          <FormField
            label="Patente"
            value={props.identification}
            onChange={props.onChangeIdentification}
          />
          <FormField
            select
            label="Asientos"
            onChange={props.onChangeSeats}
            value={props.seats}
            options={[...Array(20).keys()]}
          />
        </>
      )}
    </>
  )
})

UpdateForm.displayName = 'UpdateForm'

UpdateForm.propTypes = {
  name: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  identification: PropTypes.string.isRequired,
  hasVehicle: PropTypes.bool.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangePhoneNumber: PropTypes.func.isRequired,
  onChangeAlias: PropTypes.func.isRequired,
  onChangeBrand: PropTypes.func.isRequired,
  onChangeIdentification: PropTypes.func.isRequired,
  onChangeSeats: PropTypes.func.isRequired,
  onChangeColor: PropTypes.func.isRequired,
  onChangeModel: PropTypes.func.isRequired,
  onChangeHasVehicle: PropTypes.func.isRequired,
}

export default UpdateForm
