import avatar from "@/shared/assets/test/storybook/profile.jpeg";
import type { Meta, StoryObj } from "@storybook/react";
import dayjs from "dayjs";
import { ProfileCardView } from "./ProfileCardView";

const meta = {
    title: "entities/User/ProfileCardView",
    component: ProfileCardView,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileCardView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        profileData: {
            id: "1",
            surname: "Ivanov",
            name: "Ivan",
            birthDate: dayjs(new Date()).format("DD.MM.YYYY"),
            avatar,
        },
    },
};
