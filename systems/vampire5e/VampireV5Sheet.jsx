// systems/vampire5e/VampireV5Sheet.jsx
import { BaseSheet5e } from '../../components/BaseSheet5e';
import { vampireV5Config } from './vampireV5Config';

export const VampireV5Sheet = ({theme}) =>
{
    const mergedConfig = { ...vampireV5Config, theme: theme || vampireV5Config.theme }; 
    return <BaseSheet5e config={mergedConfig} />; 
}; 
export default VampireV5Sheet;