import * as React from 'react';
import { connect } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { PDNavStackParamList } from '~/navigator/Navigators';
import { Pool } from '~/models/Pool';
import { saveNewPool, updatePool } from '~/redux/selectedPool/Actions';
import { dispatch, AppState } from '~/redux/AppState';
import { selectPool } from '~/redux/selectedPool/Actions';
import { Database } from '~/repository/Database';
import { PoolDetails } from '~/screens/poolList/PoolDetails';

interface EditPoolScreenProps {
    navigation: StackNavigationProp<PDNavStackParamList, 'EditPool'>;
    selectedPool: Pool | null;
}

interface EditPoolScreenState {
    volume: number | '';
    type: string;
    name: string;
    originalSelectedPoolName: string;
}

const mapStateToProps = (state: AppState, ownProps: EditPoolScreenProps): EditPoolScreenProps => {
    return {
        navigation: ownProps.navigation,
        selectedPool: state.selectedPool
    };
};

export class EditPoolComponent extends React.Component<EditPoolScreenProps, EditPoolScreenState> {
    constructor(props: EditPoolScreenProps) {
        super(props);
        this.state = {
            volume: '',
            name: '',
            type: '',
            originalSelectedPoolName: ''
        };
    }

    componentDidMount() {
        if (this.props.selectedPool) {
            const pool = { ...this.props.selectedPool };
            this.setState({
                volume: pool.volume,
                name: pool.name,
                type: pool.waterType,
                originalSelectedPoolName: pool.name
            });
        }
    }

    handleDeletePoolPressed = async () => {
        dispatch(selectPool(null));
        const pool = this.props.selectedPool;
        if (pool === undefined || pool === null) {
            return;
        }
        await Database.deletePool(pool);
        this.props.navigation.navigate('PoolList');
    }

    private handleChange = (text: string, state: any) => {
        this.setState({
            [state]: text
        } as Pick<EditPoolScreenState, keyof EditPoolScreenState>);
        console.log(`state: ${state}`);
    }

    private handleSaveButtonPressed = () => {
        // model the pool object
        // let pool = {} as Pool
        if (this.props.selectedPool) {
            const pool = { ...this.props.selectedPool };
            pool.volume = Number(this.state.volume);
            pool.name = this.state.name;
            pool.waterType = this.state.type;
            // Update pool
            dispatch(updatePool(pool));
        }
        else {
            const pool = new Pool();
            pool.volume = Number(this.state.volume);
            pool.name = this.state.name;
            pool.waterType = this.state.type;
            // Create Pool
            dispatch(saveNewPool(pool));
        }

        // On success, navigate back to previous screen.
        this.props.navigation.goBack();
    }

    // Navigation option to go back to previous screen
    handleBackPressed = (): void => {
        this.props.navigation.goBack();
    }

    properCase = (text: string) => {
        const wordArr = text.split(' ');
        const work = wordArr.map(i => `${i.charAt(0).toUpperCase()}${i.slice(1)}`);
        return work.join(' ');
    }

    render() {
        const deleteButtonAction = (this.props.selectedPool === null || this.props.selectedPool === undefined)
            ? null
            : this.handleDeletePoolPressed;
        return (
            <PoolDetails
                header={ this.props.selectedPool ? 'Edit' : 'Create' }
                originalPoolName={ this.state.originalSelectedPoolName }
                name={ this.state.name }
                volume={ this.state.volume || 0 }
                type={ this.state.type }
                goBack={ this.handleBackPressed }
                updateText={ (t: string, s: string) => this.handleChange(t, s) }
                rightButtonAction={ deleteButtonAction }
                navigation={ this.props.navigation }
                pool={ this.props.selectedPool }
                handleSavePoolPressed={ this.handleSaveButtonPressed } />
        );
    }
}

export const EditPoolScreen = connect(mapStateToProps)(EditPoolComponent);