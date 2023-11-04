import type { Meta, StoryObj } from "@storybook/react";

import { EmployeeCard } from "../../index";

const meta = {
    title: "entities/Employee/EmployeeCard",
    component: EmployeeCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        employee: {
            id: "1",
            surname: "Иванов",
            name: "Иван",
            hireDate: Date.now().toLocaleString(),
            dismissDate: Date.now().toLocaleString(),
            rank: "1",
            department: {
                id: "1",
                name: "Участок 1",
            },
            berth: {
                id: "1",
                value: "Электрик",
                berthType: {
                    id: "1",
                    value: "Рабочий",
                },
            },
        },
    },
};
