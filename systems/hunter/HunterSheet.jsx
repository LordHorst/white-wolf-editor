import { BaseSheet } from "../../components/BaseSheet";
import { hunterConfig } from "./HunterConfig";

export const HunterSheet = ({ theme }) => {
    const mergedConfig = { ...hunterConfig, theme: theme || hunterConfig.theme };
    return <BaseSheet config={mergedConfig} />;
};

export default HunterSheet;