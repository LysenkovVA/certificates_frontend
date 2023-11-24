import { IEmployee } from "@/entities/Employee/model/types/IEmployee";
import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsView } from "./EmployeeDetailsView";

const meta = {
    title: "entities/Employee/EmployeeDetailsView",
    component: EmployeeDetailsView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsView>;

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
