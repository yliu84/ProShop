import React, {useState} from 'react'
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const searchHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()){
            history.push(`/search/${keyword}`);
        }else{
            history.push('/');
        }

    }

    return (
        <Form onSubmit={searchHandler} className="d-flex my-3 my-lg-0">
            <InputGroup>
                <FormControl
                    type='text'
                    name='q'
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder='Search Products...'
                    className=' ml-sm-5'
                ></FormControl>
                <InputGroup.Append>
                    <Button type='submit' variant='outline-success' className='search-btn' >
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default SearchBox
