import type { Meta, StoryObj } from "@storybook/react";
import svg from "../../../assets/icons/smile-icon.svg";
import { Icon } from "../index";

const meta = {
    title: "shared/Icon",
    component: Icon,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        Svg: svg,
        width: 64,
        height: 64,
    },
};
