import React from 'react';
import styles from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { selectFilteredContacts } from '../../redux/selectors';

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const handleDelete = (id) => dispatch(deleteContact(id));

  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <li className={styles.contactItem} key={contact.id}>
          {contact.name}: {contact.phoneNumber}
          <button
            className={styles.deleteButton}
            onClick={() => handleDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
