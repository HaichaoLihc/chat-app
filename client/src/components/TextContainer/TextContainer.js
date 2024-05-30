import React from 'react'

import '../TextContainer/TextContainer.css'

// the component that handles the messages section
// depend on the content in the messages array and the name of the user.
const TextContianer = ({users}) => {
    console.log(users)

    return (
        <div className="textContainer">
        {
          users
            ? (
              <div>
                <h1>People currently chatting:</h1>
                <div className="activeContainer">
                  <h2>
                    {users.map(({name}) => (
                      <div key={name} className="activeItem">
                        {name}
                      </div>
                    ))}
                  </h2>
                </div>
              </div>
            )
            : null
        }
      </div>
    )
}

export default TextContianer