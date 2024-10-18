import { createSlice } from '@reduxjs/toolkit';

// Initial state for the chat
const initialState = {
  messages: [], // Array to hold chat messages
  currentUser: 'User1', // Simulating a logged-in user
};

// Create the chat slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Action to send a message
    sendMessage: (state, action) => {
      const newMessage = {
        user: state.currentUser,
        text: action.payload,
        timestamp: Date.now(),
      };
      state.messages.push(newMessage); // Add the new message to the messages array
    },

    // Action to simulate receiving a message from another user
    receiveMessage: (state, action) => {
      const newMessage = {
        user: 'User2', // Simulating another user
        text: action.payload,
        timestamp: Date.now(),
      };
      state.messages.push(newMessage);
    },
  },
});

// Export the actions and the reducer
export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;
