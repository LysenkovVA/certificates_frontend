import { StateSchema } from "@/app/providers/StoreProvider";
import { IProfile } from "@/entities/Profile/model/types/IProfile";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "./ProfileCard";

const meta = {
    title: "entities/User/ProfileCard",
    component: ProfileCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
    },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const initialSchema: StateSchema = {
    userSchema: {
        authenticatedUser: {},
    },
};

const profileData: IProfile = {
    id: "1",
    surname: "Иванов",
    name: "Иван Иванович",
    birthDate: new Date().toDateString(),
};

export const Primary: Story = {
    args: {},
    decorators: [(S) => StoreDecorator(initialSchema, S)],
};
