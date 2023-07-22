import React from 'react'
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from '../../../app/models/activity';

export interface Props {
    activity: Activity;
    cancelSelectedActivityHandler: () => void;
    openFormHandler: (id: string) => void;
}

export default function ActivityDetails(
{
    activity,
    cancelSelectedActivityHandler,
    openFormHandler
}: Props){
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openFormHandler(activity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={() => cancelSelectedActivityHandler()} basic color='grey' content='Cancel'/>
                </Button.Group>
            </Card.Content>
      </Card>
    );
}