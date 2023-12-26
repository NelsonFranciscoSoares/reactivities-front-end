import { ErrorMessage, Form, Formik } from "formik";
import MyInputText from "../../app/common/form/MyInputText";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function LoginForm() {
    const { userStore } = useStore();

    return (
        <Formik
            initialValues={{email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors({error: 'Email or password invalid'}))}
        >
        {({ handleSubmit, isSubmitting, errors }) => (
             <Form onSubmit={handleSubmit} autoComplete='off' className='ui form'>
                <Header as="h2" content="Login to Reactivities" color="teal" textAlign="center"></Header>
                <MyInputText placeholder='Email' name='email'/>
                <MyInputText placeholder='Password' name='password' type='password'/>
                <ErrorMessage
                    name='error' render={() => 
                    <Label style={{marginBottom: 10}} basic color='red' content={errors.error}/>}
                />  
                <Button
                    loading={isSubmitting}
                    fluid
                    positive 
                    type='submit' 
                    content='Login'/>      
             </Form>
        )}
        </Formik>
    );
});