import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from './Message/Message'
import './Messages.css'

// the component that handles the messages section
// depend on the content in the messages array and the name of the user.
const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    </ScrollToBottom>
  );

  export default Messages