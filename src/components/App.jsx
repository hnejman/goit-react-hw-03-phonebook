import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsForm } from './ContactsForm';
import { Filter } from './Filter'

export class App extends Component {

  state = {
    contacts: []
  }

componentDidUpdate() {
  localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  if (this.state.contacts.length === 0) {
    localStorage.removeItem('contacts')
  }
}

componentDidMount(){
  const contacts = JSON.parse(localStorage.getItem("contacts"));
  if (contacts) {
    this.setState({ contacts });
  }
}

createContact = evt => {
    evt.preventDefault();
    const temporalName = evt.target.elements.name.value;
    const temporalNumber = evt.target.elements.number.value;
    if (
      !this.state.contacts.filter(check => {
        return (
          check.name.toLowerCase() === temporalName.toLowerCase()
        );
        }).length
    ) {
      const id = nanoid();
      const newContact = {
        name: temporalName,
        number: temporalNumber,
        id: id,
      };
      this.setState(prev => ({
        contacts: prev.contacts.concat(newContact)
      }))
    } else {
      alert(evt.target.elements.name.value + ' already in contacts')
    }
    evt.target.reset();
  }

  deleteItem = e => {
    const contacts = this.state.contacts.filter(el => {
      return el.id !== e.target.parentNode.id;
    });
    this.setState({ contacts });
  };

  render() {
    return (
      <>
        <ContactsForm createContact={this.createContact}/>
        <Filter contacts={this.state.contacts} deleteItem={this.deleteItem}/>
      </>
    );
  }
}
