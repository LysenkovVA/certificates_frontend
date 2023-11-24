import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsForm } from "./EmployeeDetailsForm";

const meta = {
    title: "entities/Employee/EmployeeDetailsForm",
    component: EmployeeDetailsForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const employee: IEmployee = {
    id: "1",
    surname: "Ivanov",
    name: "Ivan",
};

export const Primary: Story = {
    args: {},
};
