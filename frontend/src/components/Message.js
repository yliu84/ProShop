import React, {useState} from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);
  let messages = []
  if(children.includes(",")){
    messages = children.split(',')
  }

  if (show) {
    return (
      <Alert variant={variant} onClose={() => setShow(false)} dismissible>
        {variant === 'danger' && (
          <Alert.Heading> <i className="fas fa-exclamation-circle"></i> The following errors were found.</Alert.Heading>
        )}
        {
        messages.length > 0 ?
        (<ul>
          {
            messages.map((message,index) => (
              <li key={index}>{message}</li>
            ))
          }
        </ul>) : children
        }
      </Alert>
      )
  }

  return null

}

Message.defaultProps = {
  variant: 'info',
}

export default Message
