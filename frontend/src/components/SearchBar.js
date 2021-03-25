import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap'

export const SearchBar = ({history}) => {

    const [keyWord, setKeyword] = useState(" ")

    const submitChoice = (e) => {
        e.preventDefault()
        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }
        else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitChoice} inline>
            <Form.Control type='text' name='q' onChange={e => setKeyword(e.target.value)} placeholder="Search..." className='mr-sm-2 ml-sm-5 bg-primary'/>
            <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
        </Form>
    )
}
