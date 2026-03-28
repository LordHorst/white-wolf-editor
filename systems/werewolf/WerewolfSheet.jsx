// systems/werewolf/WerewolfSheet.jsx
import {BaseSheet} from '../../components/BaseSheet';
import {werewolfConfig} from './WerewolfConfig';

export const WerewolfSheet = ({theme}) =>{
    const mergedConfig = {...werewolfConfig, theme: theme || werewolfConfig.theme};
    return <BaseSheet config={mergedConfig}/>
};
export default WerewolfSheet;