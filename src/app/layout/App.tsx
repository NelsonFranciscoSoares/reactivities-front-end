import { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list()
                    .then(response => {
                      let activities: Activity[] = [];
                      response.forEach(activity => {
                        activity.date = activity.date.split('T')[0];
                        activities.push(activity);
                      });
                      setActivities(activities);
                      setLoading(false);
                    });
  }, []);

  function selectActivityHandler(id: string) {
    setSelectedActivity(activities.find(activity => activity.id === id));
  }

  function cancelSelectedActivityHandler(){
    setSelectedActivity(undefined);
  }

  function openFormHandler(id?: string) {
    id ? selectActivityHandler(id): cancelSelectedActivityHandler();
    setEditMode(true); 
  }

  function closeFormHandler() {
    setEditMode(false); 
  }

  function createOrUpdateActivityHandler(activity: Activity) {
    setSubmitting(true);

    if (activity.id) {
      agent.Activities.update(activity.id, activity).then(() =>{
        setActivities([...activities.filter(param => param.id !== activity.id), activity]);
      });
      setEditMode(false);
      setSubmitting(false);
      setSelectedActivity(activity);
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() =>{
        setActivities([...activities, activity]); // setActivities([...activities, {...activity, id: uuid()}]); foi no passado
      });
      setEditMode(false);
      setSubmitting(false);
      setSelectedActivity(activity);
    }
  }

  function deleteActivityHandler(id: string) {
    setSubmitting(true);

    agent.Activities.delete(id).then(() =>{
      console.log('Set submitting to false');
      setActivities([...activities.filter(param => param.id !== id)]);
      setSubmitting(false);
    });
  }

  if (loading) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar openFormHandler={openFormHandler} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities} 
                          selectedActivity={selectedActivity} 
                          selectActivityHandler={selectActivityHandler} 
                          cancelSelectedActivityHandler={cancelSelectedActivityHandler}
                          editMode={editMode}
                          openFormHandler={openFormHandler}
                          closeFormHandler={closeFormHandler}
                          createOrUpdateActivityHandler={createOrUpdateActivityHandler}
                          deleteActivityHandler={deleteActivityHandler}
                          submitting={submitting}/>   
      </Container>
    </>
  );
}

export default App;
