import React from 'react'
import { Alert } from 'react-bootstrap'

export const Message = ({ variant, children }) => {
    Message.defaultProps = {
        variant:'info'
    }
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}
