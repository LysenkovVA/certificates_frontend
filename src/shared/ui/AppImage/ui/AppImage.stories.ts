import type { Meta, StoryObj } from "@storybook/react";
import logo from "../../../assets/logo/crane.png";
import { AppImage } from "../index";

const meta = {
    title: "shared/AppImage",
    component: AppImage,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logo: Story = {
    args: {
        src: logo,
        width: 64,
        height: 64,
    },
};
