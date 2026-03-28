// systems/vampire/VampireSheet.jsx
import {BaseSheet} from '../../../components/BaseSheet';
import {vampireConfig} from './VampireConfig';

export const VampireSheet = ({theme}) => {
    const mergedConfig = {...vampireConfig, theme: theme || vampireConfig.theme};
    return <BaseSheet config={mergedConfig}/>;
};
export default VampireSheet;