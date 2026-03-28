// systems/vampire5e/VampireV5Sheet.jsx
import {BaseSheetV5} from '../../../components/BaseSheetV5';
import {vampireV5Config} from './vampireV5Config';

export const VampireV5Sheet = ({theme}) => {
    const mergedConfig = {...vampireV5Config, theme: theme || vampireV5Config.theme};
    return <BaseSheetV5 config={mergedConfig}/>;
};
export default VampireV5Sheet;