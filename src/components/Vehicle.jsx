import React, { Component } from 'react';


class Vehicle extends Component {

  state = {
    vehicle: {type:"car"},
    invalid: false
  }

  onChange = (e) => {
    const { value, name } = e.target
    const vehicle = this.state.vehicle
    console.log("change", value, name)

    this.setState({ vehicle: { ...vehicle, [name]: value } })
  }

  submitVehicle = async (e) => {
    e.preventDefault()

    const { vehicle } = this.state

    if (vehicle) {
      this.setState({ invalid: false })
      const response = await this.saveVehicle(vehicle)

    } else {
      this.setState({ invalid: true })
    }
  }

  saveVehicle = async (vehicle) => {
    console.log("veh", vehicle)

    const response = await fetch(`http://localhost:3000/vehicle?type=${vehicle.type}&model=${vehicle.model}&year=${vehicle.year}&brand=${vehicle.brand}&riders=${vehicle.riders}`, { mode: 'cors' });
    const json = await response.json()
    return json
  }

  render() {
    const { vehicle, invalid } = this.state

    return (
      <div className="container">
        <h1>Veículos</h1>

        <div className="row">

          <div className="col-6 text-left">
            <label htmlFor="type">Tipo</label>
            <select onChange={this.onChange} name="type" className="form-control" id="exampleFormControlSelect1">
              <option value="car">Carro</option>
              <option value="moto">Moto</option>
            </select>
            <br />
            <label htmlFor="brand">Marca</label>
            <input onChange={this.onChange} type="text" className="form-control" id="brand" name="brand" />
            <br />
            <label htmlFor="model">Modelo</label>
            <input onChange={this.onChange} type="text" className="form-control" id="model" name="model" />
            <br />
            <label htmlFor="year">Ano</label>
            <input onChange={this.onChange} type="number" className="form-control" id="year" name="year" />
            <br />

            {vehicle.type === "moto" && (
              <div>
                <label htmlFor="riders">Riders</label>
                <input onChange={this.onChange} type="number" className="form-control" id="riders" name="riders" />
                <br />
              </div>
            )}

            {(invalid) && (<span>Dados inseridos inválidos</span>)}
            <br />

            <button onClick={this.submitVehicle} type="button" className="btn btn-dark">Enviar</button>
          </div>

        </div>
        <hr />
      </div>
    )
  }


}

export default Vehicle