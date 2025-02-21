import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {contactData} from './constants.js';


const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactData,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, phoneNumber) {
        return {
          payload: {
            id: nanoid(),
            name,
            phoneNumber,
          },
        };
      },
    },
    deleteContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer =  contactsSlice.reducer;