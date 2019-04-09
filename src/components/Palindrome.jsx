import React, { Component } from 'react';

class Palindrome extends Component {

  state = {
    palindromes: [],
    invalid: false
  }

  onChange = (e) => {
    const { value, name } = e.target
    this.setState({ [name]: value })
  }

  submitInterval = async (e) => {
    e.preventDefault()

    const { begin, end } = this.state

    if (begin && end && (end - begin > 0)) {
      this.setState({ invalid: false })
      const response = await this.getPalindrome(begin, end)

      !response.error ? this.setState({ palindromes: response.data }) : this.setState({ invalid: true,  palindromes:[]})


    } else {
      this.setState({ invalid: true, palindromes:[] })
    }
  }


  getPalindrome = async (begin, end) => {
    const response = await fetch(`http://localhost:3000/palindrome?begin=${begin}&end=${end}`, { mode: 'cors' });
    const json = await response.json()
    return json
  }

  render() {
    const { palindromes, invalid } = this.state

    return (
      <div className="container">
        <h1>Palíndromo</h1>

        <div className="row">

          <div className="col-6 text-left">
            <label htmlFor="begin">Início</label>
            <input onChange={this.onChange} type="number" className="form-control" id="begin" name="begin" />
            <br />
            <label htmlFor="end">Fim</label>
            <input onChange={this.onChange} type="number" className="form-control" id="end" name="end" />
            {(invalid) && (<span>Dados inseridos inválidos</span>)}
            <br/>

            <button onClick={this.submitInterval} type="button" className="btn btn-dark">Enviar</button>
          </div>

          <div className="col-6 mt-4">
            {(palindromes.length) && palindromes.map((p,i) => (
              <span key={i}>{p}, </span>
              )
            )}
          </div>
        </div>
        <hr/>
      </div>
    )
  }
}

export default Palindrome