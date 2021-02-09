/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\index.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';

import { combineReducers } from 'redux';
import appReducer from './appReducer';
import schemaReducer from './schemaReducer';
import ittfStoreReducer from './ittfStoreReducer';
import artifactReducer from './artifactReducer';
import snippetReducer from './snippetReducer';
import helpBoardReducer from './helpBoardReducer';

export default combineReducers({
    app: appReducer, 
    schema: schemaReducer, 
    ittfStore: ittfStoreReducer, 
    artifact: artifactReducer, 
    snippet: snippetReducer, 
    helpBoard: helpBoardReducer
});
