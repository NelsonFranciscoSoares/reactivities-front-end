import { ErrorMessage, Form, Formik, FormikErrors } from "formik";
import MyInputText from "../../app/common/form/MyInputText";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import { RegisterUserForm } from "../../app/models/user";
import { useState } from "react";
import ValidationError from "../errors/ValidatorError";

function RegisterForm() {
    const { userStore } = useStore();

    const validationSchema = Yup.object({
        username: Yup.string().required(),
        displayName: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
    });

    const [registerUser, setRegisterUser] = useState<RegisterUserForm>({    
        username: '',
        displayName: '',
        email: '',
        password: '',
    });

    const handleFormSubmit = async (registerUser: RegisterUserForm, setErrors: (errors: FormikErrors<RegisterUserForm & {error: any}>) => void) => {
        try {
            await userStore.register(registerUser);
        } catch(error) {
            console.log(error);
            setErrors({error: error as string[]});
        }
    }

    return (
        <Formik
            initialValues={ {...registerUser, error: null }}
            onSubmit={(values, { setErrors }) => handleFormSubmit(values, setErrors) }
            validationSchema={validationSchema}
        >
        {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
             <Form onSubmit={handleSubmit} autoComplete='off' className='ui form error'>
                <Header as="h2" content="Sign Up to Reactivities" color="teal" textAlign="center"></Header>
                <MyInputText placeholder='Username' name='username'/>
                <MyInputText placeholder='Display Name' name='displayName'/>
                <MyInputText placeholder='Email' name='email'/>
                <MyInputText placeholder='Password' name='password' type='password'/>
                <ErrorMessage
                    name='error' render={() => 
                    <ValidationError errors={errors.error as unknown as string[]}/>}
                />  
                <Button
                    disabled={!dirty || !isValid || isSubmitting}
                    loading={isSubmitting}
                    fluid
                    positive 
                    type='submit' 
                    content='Login'/>      
             </Form>
        )}
        </Formik>
    );
}

export default observer(RegisterForm);