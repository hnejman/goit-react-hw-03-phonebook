import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Contacts } from 'components/Contacts';
import { Filter } from 'components/Filter';

export class App extends Component {

  state = {
    contacts: []
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
      const contacts = [...this.state.contacts, newContact];
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } else {
      alert(evt.target.elements.name.value + ' already in contacts')
    }
  }

  deleteItem = e => {
    const contacts = this.state.contacts.filter(el => {
      return el.id !== e.target.parentNode.id;
    });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    this.setState({ contacts });
  };

  render() {
    return (
      <>
        <Contacts createContact={this.createContact}/>
        <Filter contacts={this.state.contacts} deleteItem={this.deleteItem}/>
      </>
    );
  }
}
