import type { Meta, StoryObj } from "@storybook/react";
import { SelectField } from "./SelectField";

const meta = {
    title: "shared/SelectField",
    component: SelectField,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
