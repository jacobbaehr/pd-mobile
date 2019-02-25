import * as React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';

import { Pool } from 'models/Pool';
import { saveNewPool, updatePool } from 'redux/Actions';
import { dispatch, AppState } from 'redux/AppState';

import { DataArr, PoolDetails } from './poolList/PoolDetails';

interface EditPoolScreenProps {
    navigation: NavigationScreenProp<{}, void>;
    selectedPool?: Pool;
}

interface EditPoolScreenState {
    volume: number | '';
    type: string;
    name: string;
    selectedName: string;
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
            selectedName: ''
        };
    }

    componentDidMount() {
        if(this.props.selectedPool){
            const pool = {...this.props.selectedPool};
            this.setState({
                volume: pool.volume,
                name: pool.name,
                type: pool.waterType,
                selectedName: pool.name
            });
        }
    }

    private handleChange = (text:string, state:any) => {
        this.setState({
          [state]: text
        }as Pick<EditPoolScreenState, keyof EditPoolScreenState>);
      }

    private handleSaveButtonPressed = () => {
        // model the pool object
        // let pool = {} as Pool
        if (this.props.selectedPool) {
            const pool = {...this.props.selectedPool};
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

    properCase = (text:string) => {
        const wordArr = text.split(' ');
        const work = wordArr.map(i=>`${i.charAt(0).toUpperCase()}${i.slice(1)}`);
        return work.join(' ');
    }

    render(){
        // pass a new object to the array to generate an input field
        // name
        const data: DataArr[] = [
            {label:'Name', stateName: 'name', value:this.state.name, inputType:'input', },
            {label:'Water Type', stateName: 'type', value:this.state.type, inputType:'select', data: [{value: 'Salt Water'}, {value:'Chlorine'}] },
            {label:'Volume', subLabel:' (Gallons) ', stateName: 'volume', value:String(this.state.volume), inputType:'input', }
        ];
        return(
            <PoolDetails
                header={this.props.selectedPool ? 'Edit' : 'Create'}
                selectedPool={this.state.selectedName}
                data={data}
                name={this.state.name}
                volume={this.state.volume || 0}
                type={this.state.type}
                goBack={this.handleBackPressed}
                updateText={(t:string, s:string)=>this.handleChange(t, s)}
                buttonAction={this.handleSaveButtonPressed}
                navigation={this.props.navigation}
                pool={this.props.selectedPool} />
        );
    }
}

export const EditPoolScreen = connect(mapStateToProps)(EditPoolComponent);