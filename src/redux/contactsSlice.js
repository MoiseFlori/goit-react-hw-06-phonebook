import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import {contactData} from './constants.js';

const initialState = contactData; 

console.log("Initial state before Redux Persist:", initialState); // Debugging

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
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