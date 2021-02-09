/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\withRoot.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
    palette: {
        primary: {
            light: purple[300], 
            main: purple[500], 
            dark: purple[700]
        }, 
        secondary: {
            light: green[300], 
            main: green[500], 
            dark: green[700]
        }
    }
});
function withRoot(Component) {
    function __withRoot(props) {
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return  (
                <MuiThemeProvider theme={theme}>
                    <CssBaseline>
                    </CssBaseline>
                
                    <Component {...props}>
                    </Component>
                
                </MuiThemeProvider>
            )
        ;
    }
    return __withRoot;
}
export default withRoot;
