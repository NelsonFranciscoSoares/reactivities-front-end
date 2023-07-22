import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivityHandler: (id: string) => void;
    cancelSelectedActivityHandler: () => void;
    editMode: boolean;
    openFormHandler: (id: string) => void;
    closeFormHandler: () => void;
    createOrUpdateActivityHandler: (activity: Activity) => void;
    deleteActivityHandler: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard(
{
    activities,
    selectedActivity,
    selectActivityHandler,
    cancelSelectedActivityHandler,
    editMode,
    openFormHandler,
    closeFormHandler,
    createOrUpdateActivityHandler,
    deleteActivityHandler,
    submitting
}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
               <ActivityList 
                    activities={activities} 
                    selectActivityHandler={selectActivityHandler}
                    deleteActivityHandler={deleteActivityHandler}
                    submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode && 
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectedActivityHandler={cancelSelectedActivityHandler}
                    openFormHandler={openFormHandler}
                />}
                {editMode && 
                <ActivityForm 
                    activity={selectedActivity} 
                    closeFormHandler={closeFormHandler}
                    createOrUpdateActivityHandler={createOrUpdateActivityHandler}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    );
}