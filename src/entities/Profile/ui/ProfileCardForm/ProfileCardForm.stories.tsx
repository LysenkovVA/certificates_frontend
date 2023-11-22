import avatar from "@/shared/assets/test/storybook/profile.jpeg";
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCardForm } from "./ProfileCardForm";

const meta = {
    title: "entities/User/ProfileCardForm",
    component: ProfileCardForm,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileCardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        profileData: {
            id: "1",
            surname: "Ivanov",
            name: "Ivan",
            birthDate: new Date().toDateString(),
            avatar,
        },
    },
};
