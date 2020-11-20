import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    this.initPets()
  }

  initPets = () => {
    fetch('/api/pets')
    .then(r => r.json())
    .then(pets => this.setState({pets: pets}))
  }

  onChangeType = e => {
    this.setState({ filters: {type: e.target.value}})
  }

  onFindPetsClick = () => {
    let url
    if (this.state.filters.type === 'all') {
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
      .then(r => r.json())
      .then(pets => this.setState({pets: pets}))
  }

  onAdoptPet = id => {
    const tempPets = [...this.state.pets]
    tempPets.find(p => p.id === id).isAdopted = true
    this.setState({pets: tempPets})
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
