import { observer } from 'mobx-react-lite';
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

const ServerError = function () {

    const { commonStore } = useStore();

    return (
        <Container>
            <Header as='h1' content='Server Error' />
            <Header sub as='h1' color='red' content={commonStore.error?.message} />
            {
                commonStore.error?.details &&
                <Segment>
                    <Header as='h4' content='Stack Trace' color='teal' />
                    <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                </Segment>
            }
        </Container>
    );
};

export default observer(ServerError);