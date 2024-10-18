import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from '../features/chatSlice';
import { Box, Button, TextField, List, ListItem, ListItemText, Typography, Grid, Paper, Avatar, IconButton, Popover } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker from 'emoji-picker-react';
import './Chat.css'; // Import CSS for background image
import avatar1 from './download.jpg'; // Update path accordingly
import avatar2 from './download (1).jpg';
import avatar3 from './images.png';

const Chat = () => {
  const [input, setInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.chat.currentUser);
  
  const contacts = [
    { name: "Vicky", avatar: avatar1, online: true },
    { name: "Abhay", avatar: avatar2, online: true },
    { name: "Racoon😜", avatar: avatar3, online: false },
  ];
  const [activeContact, setActiveContact] = useState(contacts[1]); // Set default active contact

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const receiveMockMessages = () => {
      setTimeout(() => {
        dispatch(receiveMessage('Hello! How are you today?'));
      }, 5000);

      setTimeout(() => {
        dispatch(receiveMessage('Are you available for a meeting?'));
      }, 10000);
    };

    receiveMockMessages();
  }, [dispatch]);

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage(input));
      setInput('');
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
  };

  const handleEmojiPickerToggle = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'emoji-popover' : undefined;

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Sidebar for contacts */}
      <Grid item xs={3} sx={{ background: 'linear-gradient(45deg, #3a7bd5 30%, #00d2ff 90%)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, textAlign: 'center',  background: 'linear-gradient(45deg, #3a7bd5 30%, #00d2ff 90%)' }}>
          <Typography variant="h4" sx={{ color: 'white' }}>
           Recent Chats
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <TextField 
            variant="outlined" 
            placeholder="Search here..." 
            fullWidth 
            sx={{ bgcolor: 'white', mb: 2, borderRadius: '4px' }}
          />
          <List>
            {contacts.map((contact, index) => (
              <ListItem 
                key={index} 
                button 
                onClick={() => setActiveContact(contact)} 
                sx={{
                  bgcolor: contact === activeContact ? '#365899' : 'inherit', 
                  mb: 1, 
                  '&:hover': { bgcolor: '#5575b2' },
                  borderRadius: '10px',
                  transition: '0.3s'
                }}
              >
                <Avatar src={contact.avatar} sx={{ mr: 2 }} />
                <ListItemText 
                  primary={contact.name} 
                  secondary={contact.online ? "Online" : "Offline"} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Grid>

      {/* Chat section with background image */}
      <Grid item xs={9} className="chat-background" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'rgba(255, 255, 255, 0.3)', borderRadius: '20px' }}>
          {/* Contact Info & Icons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, bgcolor: '#f4f7fb', p: 2, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={activeContact.avatar} sx={{ mr: 2 }} />
              <Typography variant="h6">{activeContact.name}</Typography>
            </Box>
            <Box>
              <IconButton>
                <CallIcon />
              </IconButton>
              <IconButton>
                <VideoCallIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Messages list */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              p: 2,
              borderRadius: '10px',
              boxShadow: 'inset 0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index} sx={{ mb: 1, display: 'flex', justifyContent: msg.user === currentUser ? 'flex-end' : 'flex-start' }}>
                  <Paper sx={{ p: 2, bgcolor: msg.user === currentUser ? '#d4f1f4' : '#ffffff', maxWidth: '70%', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <ListItemText
                      primary={msg.text}
                      secondary={new Date(msg.timestamp).toLocaleTimeString()}
                    />
                  </Paper>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>

          {/* Input field */}
          <Box sx={{ display: 'flex', mt: 2 }}>
            <IconButton onClick={handleEmojiPickerToggle}>
              <EmojiEmotionsIcon />
            </IconButton>
            <TextField
              fullWidth
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message"
              sx={{ bgcolor: 'white', borderRadius: '4px', mr: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              sx={{ borderRadius: '20px', textTransform: 'none', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
            >
              Send
            </Button>
          </Box>
          
          {/* Emoji Picker */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleEmojiPickerToggle}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Popover>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
