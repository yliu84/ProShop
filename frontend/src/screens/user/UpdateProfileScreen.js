import React, {useState, useEffect} from 'react'
import {useAlert} from 'react-alert';
import {Link} from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {useDispatch, useSelector} from 'react-redux';
import {updateUserProfile, getUserProfile} from '../../actions/userActions';
import {USER_UPDATE_PROFILE_RESET} from '../../constants/userConstants';
import MetaData from '../../components/MetaData'

const UpdateProfileScreen = ({history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()
    const alert = useAlert()

    const {user} = useSelector(state => state.auth);
    const {error, isUpdated, loading} = useSelector(state => state.user);

    useEffect(() => {

        if(user){
            setName(user.name);
            setEmail(user.email);
        }

        if(isUpdated){
            alert.success('User updated successfully');
            dispatch(getUserProfile());

            history.push('/profile');

            dispatch({
                type: USER_UPDATE_PROFILE_RESET
            });
        }
    }, [dispatch, alert, error, history, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name', name)
        formData.set('email', email)
        dispatch(updateUserProfile(formData))
    };

    return (
        <FormContainer>
            <MetaData title={'Update Profile'} />         
            <h1 className="mt-2 mb-5">Update Profile</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? (
                <Loader />
            ) : 
            (
                <Form onSubmit={submitHandler} encType='multipart/form-data'>
                    
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name" 
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className="mt-4 mb-3" disabled={loading ? true : false}>
                        Update
                    </Button>
                    <Link className='btn btn-light mt-4 mb-3 ml-2' to='/profile'>
                        Cancel
                    </Link>
                </Form>
            )}
        </FormContainer>
    )
}

export default UpdateProfileScreen
