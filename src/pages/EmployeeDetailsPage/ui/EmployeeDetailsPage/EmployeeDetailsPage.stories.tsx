import { StateSchema } from "@/app/providers/StoreProvider";
import { MemoryRouterDecorator } from "@/shared/config/storybook/MemoryRouter/MemoryRouterDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import type { Meta, StoryObj } from "@storybook/react";
import { EmployeeDetailsPage } from "../../index";

const meta = {
    title: "pages/EmployeeDetailsPage",
    component: EmployeeDetailsPage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof EmployeeDetailsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

const schema: StateSchema = {
    userShema: {},
    employeeDetailsSchema: {
        employeeDetails: {
            id: "1",
            surname: "Ivanov",
            name: "Ivan",
        },
    },
};

export const Primary: Story = {
    args: {},
    decorators: [
        (S) => StoreDecorator(schema, S),
        (S) =>
            MemoryRouterDecorator("/api/employees/1", "/api/employees/:id", S),
    ],
};
