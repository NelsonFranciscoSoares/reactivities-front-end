import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export interface Props {
    inverted?: boolean; // optional field -> it's different of boolean | undefined
    content?: string;
}

export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props){
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    );
}