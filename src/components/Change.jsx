import React, { Component } from 'react';


class Change extends Component {

  state = {
    change: {},
    money: 0,
    total: 0,
    invalid: false
  }

  onChange = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  submitValues = async (e) => {
    e.preventDefault()

    const { total, money } = this.state

    if (total && money && (money >= total)) {
      this.setState({ invalid: false })
      const response = await this.getChange(total, money)

      !response.error ? this.setState({ change: response.data }) : this.setState({ invalid: true, change: null })

      console.log("respo", response)

    } else {
      this.setState({ invalid: true, palindromes: [] })
    }
  }

  getChange = async (total, money) => {
    const response = await fetch(`http://localhost:3000/change?total=${total}&money=${money}`, { mode: 'cors' });
    const json = await response.json()
    return json
  }


  render() {
    const { invalid, change } = this.state

    return (
      <div className="container">
        <h1>Troco</h1>

        <div className="row">

          <div className="col-6 text-left">
            <label htmlFor="begin">Total</label>
            <input onChange={this.onChange} type="number" className="form-control" id="total" name="total" />
            <br />
            <label htmlFor="money">Dinheiro entregue</label>
            <input onChange={this.onChange} type="number" className="form-control" id="money" name="money" />
            {(invalid) && (<span>Dados inseridos inválidos</span>)}
            <br />

            <button onClick={this.submitValues} type="button" className="btn btn-dark">Enviar</button>
          </div>

          <div className="col-6 mt-4">
            {(change.change || change.change === 0) && (
              <ul>
                <li>Troco total: {change.change}</li>
                <li>Notas de 1: {change.bills_1}</li>
                <li>Notas de 10: {change.bills_10}</li>
                <li>notas de 100: {change.bills_100}</li>

              </ul>
            )}
          </div>
        </div>
        <hr />
      </div>
    )
  }
}

export default Change