import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { selectedActivity, createActivity, updateActivity } = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState);

    function submitHandler(){
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function inputChangesHandler(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={submitHandler} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={inputChangesHandler}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={inputChangesHandler}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={inputChangesHandler}/>
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={inputChangesHandler}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={inputChangesHandler}/>
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={inputChangesHandler}/>
                <Button loading={activityStore.loading} floated='right' positive type='submit' content='Submit' onChange={inputChangesHandler}/>
                <Button onClick={() => activityStore.closeFormHandler()} floated='right' type="button" content='Cancel' />
            </Form>
        </Segment>
    );
})