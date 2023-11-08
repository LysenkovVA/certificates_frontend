import { EmployeeDetailsForm } from "@/pages/EmployeeDetailsPage/ui/EmployeeDetailsForm/EmployeeDetailsForm";
import { EmployeeDetailsView } from "@/pages/EmployeeDetailsPage/ui/EmployeeDetailsView/EmployeeDetailsView";
import { classNames } from "@/shared/lib/classNames/classNames";
import { memo, useCallback, useState } from "react";
import cls from "./EmployeeDetailsPage.module.scss";

interface EmployeeDetailsPageProps {
    className?: string;
}

const EmployeeDetailsPage = (props: EmployeeDetailsPageProps) => {
    const { className } = props;

    const [canEdit, setCanEdit] = useState(false);

    const onEditClick = useCallback(() => {
        setCanEdit(true);
    }, []);

    const onSaveClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    const onCancelClick = useCallback(() => {
        setCanEdit(false);
    }, []);

    return (
        <div className={classNames(cls.EmployeeDetailsPage, {}, [className])}>
            {canEdit ? <EmployeeDetailsForm /> : <EmployeeDetailsView />}
        </div>
    );
};

export default memo(EmployeeDetailsPage);
