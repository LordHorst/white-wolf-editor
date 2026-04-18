import { BaseSheet } from "../../components/BaseSheet";
import { hunter5eConfig } from "./Hunter5eConfig";

export const Hunter5eSheet = ({ theme }) => {
    const mergedConfig = { ...hunter5eConfig, theme: theme || hunter5eConfig.theme };
    return <BaseSheet config={mergedConfig} />;
};

export default Hunter5eSheet;