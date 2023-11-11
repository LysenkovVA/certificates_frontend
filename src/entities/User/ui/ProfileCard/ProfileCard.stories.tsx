import { StateSchema } from "@/app/providers/StoreProvider";
import { IUser } from "@/entities/User/model/types/IUser";
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
    user: {
        authenticatedUser: {},
    },
};

const profileData: IUser = {
    id: "1",
    email: "email@email.ru",
    token: "TOKEN",
    surname: "Иванов",
    name: "Иван Иванович",
    birthDate: new Date().toDateString(),
};

export const Primary: Story = {
    args: { profileData },
    decorators: [(S) => StoreDecorator(initialSchema, S)],
};
