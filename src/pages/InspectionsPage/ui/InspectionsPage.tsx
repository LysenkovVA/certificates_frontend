import { InspectionsList } from "@/features/Inspections/inspectionsList";
import { memo } from "react";

export interface InspectionsPageProps {
    className?: string;
}

const InspectionsPage = (props: InspectionsPageProps) => {
    const { className } = props;

    return <InspectionsList />;
};

export default memo(InspectionsPage);
