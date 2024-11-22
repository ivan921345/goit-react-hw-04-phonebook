import Notiflix from 'notiflix';
import { useEffect, useState } from 'react';
import AddNumberForm from './AddNumberForm';
import Contacts from './Contacts';
import Filter from './Filter';
Notiflix.Notify.init({
  clickToClose: true,
  cssAnimationStyle: 'zoom',
});
export const App = () => {
  const [contacts, setContacts] = useState(() =>
    localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : []
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const fileteredArray = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const onFormSubmit = values => {
    console.log(values);
    if (contacts.some(contact => contact.name === values.name)) {
      Notiflix.Notify.failure('Contact with this name already exists');
      return;
    }
    if (values.name.trim() !== '' || values.number.trim() !== '') {
      setContacts(prevContacts => [...prevContacts, values]);
    } else {
      Notiflix.Notify.failure('There is no values');
    }
  };
  const onDelete = name => {
    setContacts(prevContacts => prevContacts.filter(el => el.name !== name));
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        flexDirection: 'column',
      }}
    >
      <AddNumberForm onSubmit={onFormSubmit} />
      <Filter onFilterChange={onFilterChange} />
      <Contacts contacts={fileteredArray} onDelete={onDelete} />
    </div>
  );
};
