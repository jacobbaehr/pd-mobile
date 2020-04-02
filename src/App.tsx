import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';

import { PDNavStack } from '~/navigator/Navigators';

export interface AppProps extends DispatchProp<any> { }

export class AppComponent extends React.PureComponent<AppProps, {}> {
    /** */

    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return <PDNavStack />;
    }
}

export const App = connect()(AppComponent);
