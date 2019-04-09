import React, { Component } from 'react';


class Cep extends Component {

  state = {
    ceps: {},
    invalid: false,
    adresses: []
  }

  onChange = (e) => {
    const { value, name } = e.target
    const ceps = this.state.ceps

    this.setState({ ceps: {...ceps, [name]:value }})
  }

  submitCeps = async (e) => {
    e.preventDefault()

    const { ceps } = this.state

    let cepsString = ''
    let cepsKeys = Object.keys(ceps)

    for(let key of cepsKeys){
      cepsString += ceps[key] + ","
    }

    cepsString =cepsString.slice(0,-1)

    if (cepsString) {
      this.setState({ invalid: false })
      const response = await this.getAdresses(cepsString)


      await !response.error ? this.setState({ adresses: response.data }, () => {console.log("hits.sta", this.state)}) : this.setState({ invalid: true,  adresses:[]})


    } else {
      this.setState({ invalid: true, adresses:[] })
    }
  }


  getAdresses = async (ceps) => {
    const response = await fetch(`http://localhost:3000/cep?ceps=${ceps}`, { mode: 'cors' });
    const json = await response.json()
    return json
  }


  render() {
    const { adresses, invalid } = this.state

    return (
      <div className="container">
        <h1>CEP</h1>

        <div className="row">

          <div className="col-6 text-left">
            <label htmlFor="cep1">Cep 1</label>
            <input onChange={this.onChange} type="number" className="form-control" id="cep1" name="cep1" />
            <br />

            <label htmlFor="cep2">Cep 2</label>
            <input onChange={this.onChange} type="number" className="form-control" id="cep2" name="cep2" />
            <br />

            <label htmlFor="cep3">Cep 3</label>
            <input onChange={this.onChange} type="number" className="form-control" id="cep3" name="cep3" />
            <br />

            <label htmlFor="cep4">Cep 4</label>
            <input onChange={this.onChange} type="number" className="form-control" id="cep4" name="cep4" />
            <br />

            <label htmlFor="cep5">Cep 5</label>
            <input onChange={this.onChange} type="number" className="form-control" id="cep5" name="cep5" />
            <br />


            <button onClick={this.submitCeps} type="button" className="btn btn-dark">Enviar</button>
          </div>

          <div className="col-6 mt-4">
            {adresses && adresses.map((a,i) => (
              <div key={i}>
              {i+1}:  {a ? <span>{JSON.stringify(a)}</span> : "Cep inválido"} 
              </div>
              )
            )}
          </div>
        </div>
        <hr/>
      </div>
    )
  }


}

export default Cep