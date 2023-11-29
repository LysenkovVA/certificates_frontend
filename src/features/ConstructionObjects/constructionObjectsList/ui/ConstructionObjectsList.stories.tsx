import type { Meta, StoryObj } from "@storybook/react";
import { ConstructionObjectsList } from "./ConstructionObjectsList";

const meta = {
    title: "features/ConstructionObjects/ConstructionObjectsList",
    component: ConstructionObjectsList,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ConstructionObjectsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
