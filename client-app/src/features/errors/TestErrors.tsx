import { useState } from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import axios from 'axios';
import ValidationError from './ValidationError';

export default function TestErrors() {

    // const baseUrl = import.meta.env.VITE_API_URL + '/api/'

    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get('/buggy/not-found').catch(err => err.response);
    }

    function handleBadRequest() {
        axios.get('/buggy/bad-request').catch(err => err.response);
    }

    function handleServerError() {
        axios.get('/buggy/server-error').catch(err => err.response);
    }

    function handleUnauthorized() {
        axios.get('/buggy/unauthorized').catch(err => err.response);
    }

    function handleBadGuid() {
        axios.get('/activities/notaguid').catch(err =>err);
    }

    function handleValidationError() {
        axios.post('/activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorized} content='Unauthorized' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors &&
                <ValidationError errors={errors} />
            }
        </>
    )
}