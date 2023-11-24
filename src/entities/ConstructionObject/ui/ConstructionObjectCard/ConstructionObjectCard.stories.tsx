import type { Meta, StoryObj } from "@storybook/react";
import { ConstructionObjectCard } from "./ConstructionObjectCard";

const meta = {
    title: "entities/ConstructionObjectCard",
    component: ConstructionObjectCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ConstructionObjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {},
};
